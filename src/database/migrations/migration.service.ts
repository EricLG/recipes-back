import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import { Model, Connection } from 'mongoose'

import { RecipeSeason } from './../../domain/recipe/enums/recipe-season.enum'
import { Migration, MigrationDocument } from './migration.schema'
import { RecipeVegetarianStatus } from '../../domain/recipe/enums/recipe-vegetarian-status.enum'
import { User, UserDocument } from '../../domain/user/schemas/user.schema'

@Injectable()
export class MigrationService implements OnModuleInit {

    private readonly logger = new Logger(MigrationService.name)

    constructor(
        private svcConfig: ConfigService,
        @InjectModel(Migration.name) private migrationModel: Model<MigrationDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectConnection() private readonly connection: Connection,
    ) {}

    async onModuleInit() {
        await this.runMigrateVegetarianToVegetarianStatus()
        await this.runMigrateRecipeSeasonAllYearToAllSeason()
        await this.runMigrateSaturatedFattyAcids()
        await this.runMigratePreparationTimeStringToNumber()
    }

    async runMigrateVegetarianToVegetarianStatus() {
        const name = 'migrate-vegetarian-to-vegetarianStatus'
        const applied = await this.migrationModel.findOne({ name }).lean().exec()
        if (applied) {
            this.logger.log(`Migration ${name} already applied`)
            return
        }

        const recipesColl = this.connection.collection('recipes')
        const hasOld = await recipesColl.findOne({ vegetarian: { $exists: true } })
        if (!hasOld) {
            await this.migrationModel.create({ name, appliedAt: new Date() })
            this.logger.log(`No 'vegetarian' field found; migration ${name} recorded as applied`)
            return
        }

        const veg = RecipeVegetarianStatus.VEGETARIAN
        const nonVeg = RecipeVegetarianStatus.NON_VEGETARIAN

        const res1 = await recipesColl.updateMany({ vegetarian: true }, { $set: { vegetarianStatus: veg }, $unset: { vegetarian: '' } })
        const res2 = await recipesColl.updateMany({ vegetarian: false }, { $set: { vegetarianStatus: nonVeg }, $unset: { vegetarian: '' } })

        const updatedCount = (res1.modifiedCount || 0) + (res2.modifiedCount || 0)
        this.logger.log(`Updated ${updatedCount} recipes (true:${res1.modifiedCount}, false:${res2.modifiedCount})`)

        await this.migrationModel.create({ name, appliedAt: new Date() })
        this.logger.log(`Migration ${name} applied`)
    }

    async runMigrateRecipeSeasonAllYearToAllSeason() {
        const name = 'migrate-recipe-season-all-year-to-all-season'
        const applied = await this.migrationModel.findOne({ name }).lean().exec()
        if (applied) {
            this.logger.log(`Migration ${name} already applied`)
            return
        }

        const recipesColl = this.connection.collection('recipes')
        const hasAllYear = await recipesColl.findOne({ season: { $in: ['all_year'] } })
        if (!hasAllYear) {
            await this.migrationModel.create({ name, appliedAt: new Date() })
            this.logger.log(`No 'all_year' season found; migration ${name} recorded as applied`)
            return
        }

        const allYear = [RecipeSeason.SPRING, RecipeSeason.SUMMER, RecipeSeason.AUTUMN, RecipeSeason.WINTER]
        const res1 = await recipesColl.updateMany({ season: { $in: ['all_year'] } }, { $set: { season: allYear } })

        this.logger.log(`Updated ${res1.modifiedCount} recipes`)

        await this.migrationModel.create({ name, appliedAt: new Date() })
        this.logger.log(`Migration ${name} applied`)
    }

    async runMigrateSaturatedFattyAcids() {
        const name = 'migrate-saturated-fatty-acids'
        const applied = await this.migrationModel.findOne({ name }).lean().exec()
        if (applied) {
            this.logger.log(`Migration ${name} already applied`)
            return
        }

        // Need to add saturatedFattyAcids field to all foods that don't have it, and set it to 0 (or null) if not present. This is needed because we want to make it a required field in the schema, and we don't want to break existing data.
        const foodsColl = this.connection.collection('foods')
        const hasOne = await foodsColl.findOne({ 'nutrientsPer100.saturatedFattyAcids': { $exists: false } })
        if (!hasOne) {
            await this.migrationModel.create({ name, appliedAt: new Date() })
            this.logger.log(`No 'saturatedFattyAcids' field found in foods; migration ${name} recorded as applied`)
            return
        }

        const res = await foodsColl.updateMany(
            { 'nutrientsPer100.saturatedFattyAcids': { $exists: false } },
            { $set: { 'nutrientsPer100.saturatedFattyAcids': 0 } },
        )
        this.logger.log(`Updated ${res.modifiedCount} foods with missing saturatedFattyAcids field`)

        await this.migrationModel.create({ name, appliedAt: new Date() })
        this.logger.log(`Migration ${name} applied`)
    }

    private convertPreparationTimeToMinutes(value: string | number | null | undefined): number | null {
        if (!value) return null

        // If already a number, return it
        if (typeof value === 'number') return value

        const str = value.toString().trim().toLowerCase()
        if (str === '') return null

        let totalMinutes = 0

        // Match "1h20" or "1h 20" format (hours and minutes together)
        const hoursMinutesMatch = str.match(/(\d+)\s*h\s*(\d+)/)
        if (hoursMinutesMatch) {
            totalMinutes += parseInt(hoursMinutesMatch[1], 10) * 60 // hours
            totalMinutes += parseInt(hoursMinutesMatch[2], 10) // minutes
            this.logger.debug(`Try to convert "${value}" to ${totalMinutes} minutes`)
            return totalMinutes > 0 ? totalMinutes : null
        }

        // Match just hours "1h" or "2h"
        const hoursMatch = str.match(/(\d+)\s*h(?!\d)/)
        if (hoursMatch) {
            totalMinutes += parseInt(hoursMatch[1], 10) * 60
        }

        // Match minutes with explicit "min" keyword like "20 min" or "30 min"
        const minutesMatch = str.match(/(\d+)\s*(?:min|minutes?)/)
        if (minutesMatch) {
            totalMinutes += parseInt(minutesMatch[1], 10)
        }

        // If no match but string exists, try to parse as pure number
        if (totalMinutes === 0 && str) {
            const num = parseInt(str, 10)

            if (!isNaN(num)) return num
        }

        this.logger.debug(`Try to convert "${value}" to ${totalMinutes} minutes`)
        return totalMinutes > 0 ? totalMinutes : null
    }

    async runMigratePreparationTimeStringToNumber() {
        const name = 'migrate-preparation-time-string-to-number'
        const applied = await this.migrationModel.findOne({ name }).lean().exec()
        if (applied) {
            this.logger.log(`Migration ${name} already applied`)
            return
        }

        const recipesColl = this.connection.collection('recipes')

        // Find all recipes with preparationTime field that might be string
        const recipes = await recipesColl.find({}).toArray()
        const recipesToUpdate: Array<{ id: any, value: number | null }> = []

        for (const recipe of recipes) {
            if (recipe.preparationTime !== undefined) {
                const converted = this.convertPreparationTimeToMinutes(recipe.preparationTime)
                if (converted !== null || recipe.preparationTime !== null) {
                    recipesToUpdate.push({ id: recipe._id, value: converted })
                }
            }
        }

        // Update recipes
        for (const item of recipesToUpdate) {
            if (item.value === null) {
                await recipesColl.updateOne({ _id: item.id }, { $unset: { preparationTime: '' } })
            } else {
                await recipesColl.updateOne({ _id: item.id }, { $set: { preparationTime: item.value } })
            }
        }

        this.logger.log(`Updated ${recipesToUpdate.length} recipes - converted preparationTime from string to number`)

        await this.migrationModel.create({ name, appliedAt: new Date() })
        this.logger.log(`Migration ${name} applied`)
    }

}
