import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import { Model, Connection } from 'mongoose'

import { Migration, MigrationDocument } from './migration.schema'
import { RecipeVegetarianStatus } from '../../domain/recipe/enums/recipe-vegetarian-status.enum'

@Injectable()
export class MigrationService implements OnModuleInit {

    private readonly logger = new Logger(MigrationService.name)

    constructor(
        @InjectModel(Migration.name) private migrationModel: Model<MigrationDocument>,
        @InjectConnection() private readonly connection: Connection,
    ) {}

    async onModuleInit() {
        await this.runMigrateVegetarianToVegetarianStatus()
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

}
