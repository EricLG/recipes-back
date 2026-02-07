import { Injectable, NotFoundException } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateRecipeWithRelationsDto, UpdateRecipeWithRelationsDto } from '../dto/recipe-with-relations.dto'
import { DetailedRecipeDto } from '../dto/response-recipe-food.dto'
import { RecipeMapper } from './../../../domain/recipe/mappers/recipe.mapper'
import { Recipe, RecipeDocument } from './../../../domain/recipe/schemas/recipe.schema'
import { CreateRecipeDto } from './../dto/create-recipe.dto'
import { UpdateRecipeDto } from './../dto/update-recipe.dto'
import { RecipeFoodsService } from './recipe-foods.service'
import { RecipeSubRecipesService } from './recipe-sub-recipes.service'
import { IRecipe } from '../dto/recipe-sub-recipe-response.dto'

@Injectable()
export class RecipesService {

    private readonly logger = new Logger(RecipesService.name)

    constructor(
        @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
        private readonly svcRecipeFoods: RecipeFoodsService,
        private readonly svcRecipeSubRecipes: RecipeSubRecipesService,
        private readonly mapper: RecipeMapper,
    ) {}

    async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        const createdRecipe = new this.recipeModel(createRecipeDto)
        const saved = await createdRecipe.save()
        this.logger.log(`✅ Created recipe - ID: ${saved.id}, name: "${saved.name}"`)
        return saved
    }

    async findAll(): Promise<Recipe[]> {
        return this.recipeModel.find().sort({ name: 1 }).exec()
    }

    async findOne(id: string): Promise<Recipe> {
        const recipe = await this.recipeModel.findById(id).exec()
        if (!recipe) {
            throw new NotFoundException(`Recipe with ID ${id} not found`)
        }
        return recipe
    }

    async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
        const updatedRecipe = await this.recipeModel
            .findByIdAndUpdate(id, updateRecipeDto, { new: true })
            .exec()
        if (!updatedRecipe) {
            throw new NotFoundException(`Recipe with ID ${id} not found`)
        }
        this.logger.log(`✅ Updated recipe - ID: ${id}, name: "${updatedRecipe.name}"`)
        return updatedRecipe
    }

    async remove(id: string): Promise<void> {
        const result = await this.recipeModel.findByIdAndDelete(id).exec()
        if (!result) {
            throw new NotFoundException(`Recipe with ID ${id} not found`)
        }
        this.logger.log(`✅ Deleted recipe - ID: ${id}, name: "${result.name}"`)
    }

    async findDetailedRecipe(id: string): Promise<DetailedRecipeDto> {
        // Fetch recipe with full details
        const recipe = await this.recipeModel.findById(id).exec()

        if (!recipe) {
            throw new NotFoundException(`Recipe with ID ${id} not found`)
        }

        // Fetch related foods and sub-recipes
        const recipeFoods = await this.svcRecipeFoods.findByRecipeId(id)
        const subRecipes = await this.svcRecipeSubRecipes.findByParentRecipeId(id)

        // Transform to DetailedRecipeDto
        return this.mapper.toDetailedRecipeDto(recipe as IRecipe, recipeFoods, subRecipes)
    }

    async createWithRelations(dto: CreateRecipeWithRelationsDto): Promise<DetailedRecipeDto> {
        this.logger.debug(`[createWithRelations] Creating recipe with relations - name: "${dto.name}"`)

        // Create recipe
        const createdRecipe = new this.recipeModel({
            name: dto.name,
            instructions: dto.instructions,
            vegetarian: dto.vegetarian ?? false,
            season: dto.season,
            category: dto.category,
            servings: dto.servings,
        })
        const savedRecipe = await createdRecipe.save()
        const recipeId = ((savedRecipe as unknown) as { _id?: { toString(): string } })._id?.toString() || ''
        this.logger.log(`✅ Created recipe - ID: ${savedRecipe.id}, name: "${savedRecipe.name}"`)

        // Create recipe foods
        this.logger.debug(`[createWithRelations] Creating ${dto.recipeFoods?.length || 0} recipe foods`)
        const createdRecipeFoods = await Promise.all(
            (dto.recipeFoods || []).map(async (rf) => {
                this.logger.debug(`[createWithRelations] Creating recipe food - foodId: ${rf.foodId}, quantity: ${rf.quantity}`)
                const created = await this.svcRecipeFoods.create({
                    recipeId,
                    foodId: rf.foodId,
                    measureId: rf.measureId,
                    quantity: rf.quantity,
                })
                const foodIdStr = ((created as unknown) as { _id?: { toString(): string } })._id?.toString() || ''
                this.logger.log(`✅ Created recipe food - ID: ${foodIdStr}, recipeId: ${recipeId}, foodId: ${rf.foodId}`)
                return created
            }),
        )

        // Create recipe sub-recipes
        this.logger.debug(`[createWithRelations] Creating ${dto.recipeSubRecipes?.length || 0} recipe sub-recipes`)
        const createdSubRecipes = await Promise.all(
            (dto.recipeSubRecipes || []).map(async (sr) => {
                this.logger.debug(`[createWithRelations] Creating recipe sub-recipe - childRecipeId: ${sr.childRecipeId}, quantity: ${sr.quantity}`)
                const created = await this.svcRecipeSubRecipes.create({
                    parentRecipeId: recipeId,
                    childRecipeId: sr.childRecipeId,
                    quantity: sr.quantity,
                })
                const subRecipeIdStr = ((created as unknown) as { _id?: { toString(): string } })._id?.toString() || ''
                this.logger.log(`✅ Created recipe sub-recipe - ID: ${subRecipeIdStr}, parentRecipeId: ${recipeId}, childRecipeId: ${sr.childRecipeId}`)
                return created
            }),
        )

        this.logger.log(`✅ Complete createWithRelations - Recipe: ${recipeId}, Foods: ${createdRecipeFoods.length}, SubRecipes: ${createdSubRecipes.length}`)
        return this.findDetailedRecipe(recipeId)
    }

    async updateWithRelations(id: string, dto: UpdateRecipeWithRelationsDto): Promise<DetailedRecipeDto> {
        this.logger.debug(`[updateWithRelations] Updating recipe with relations - ID: ${id}`)
        // Check recipe exists
        const recipe = await this.recipeModel.findById(id).exec()
        if (!recipe) {
            throw new NotFoundException(`Recipe with ID ${id} not found`)
        }

        // Update recipe properties
        if (dto.name !== undefined) recipe.name = dto.name
        if (dto.instructions !== undefined) recipe.instructions = dto.instructions
        if (dto.vegetarian !== undefined) recipe.vegetarian = dto.vegetarian
        if (dto.season !== undefined) recipe.season = dto.season
        if (dto.category !== undefined) recipe.category = dto.category
        if (dto.servings !== undefined) recipe.servings = dto.servings

        const savedRecipe = await recipe.save()
        this.logger.log(`✅ Updated recipe - ID: ${id}, name: "${savedRecipe.name}"`)

        // Handle recipeFoods sync (upsert: id present = update, id absent = create, missing = delete)
        if (dto.recipeFoods !== undefined) {
            this.logger.debug(`[updateWithRelations] Syncing recipe foods - total items from incoming DTO: ${dto.recipeFoods.length}`)

            // Clean null ids to undefined
            const cleanRecipeFoods = dto.recipeFoods.map(f => ({
                ...f,
                id: f.id || undefined,
            }))

            // Fetch existing foods
            const existingFoods = await this.svcRecipeFoods.findByRecipeId(id)
            this.logger.debug(`[updateWithRelations] Syncing recipe foods - existing items in DB: ${existingFoods.length}`)

            const incomingFoodIds = new Set(cleanRecipeFoods.filter(f => f.id).map(f => f.id!))

            // Delete foods not in incoming list
            for (const food of existingFoods) {
                if (!incomingFoodIds.has(food.id)) {
                    await this.svcRecipeFoods.remove(food.id)
                    // this.logger.log(`✅ Deleted recipe food - ID: ${food.id}`);
                }
            }

            // Create or update foods
            await Promise.all(
                cleanRecipeFoods.map(async (f) => {
                    if (f.id) {
                        // Update
                        await this.svcRecipeFoods.update(f.id, {
                            foodId: f.foodId,
                            measureId: f.measureId,
                            quantity: f.quantity,
                        })
                    } else {
                        // Create
                        await this.svcRecipeFoods.create({
                            recipeId: id,
                            foodId: f.foodId,
                            measureId: f.measureId,
                            quantity: f.quantity,
                        })
                    }
                }),
            )
        }

        // Handle recipeSubRecipes sync
        if (dto.recipeSubRecipes !== undefined) {
            this.logger.debug(`[updateWithRelations] Syncing recipe sub-recipes - total items: ${dto.recipeSubRecipes.length}`)

            // Clean null ids to undefined
            const cleanRecipeSubRecipes = dto.recipeSubRecipes.map(sr => ({
                ...sr,
                id: sr.id || undefined,
            }))

            // Fetch existing sub-recipes
            const existingSubRecipes = await this.svcRecipeSubRecipes.findByParentRecipeId(id)

            const incomingSubRecipeIds = new Set(cleanRecipeSubRecipes.filter(sr => sr.id).map(sr => sr.id!))

            // Delete sub-recipes not in incoming list
            for (const subRecipe of existingSubRecipes) {
                if (!incomingSubRecipeIds.has(subRecipe.id)) {
                    await this.svcRecipeSubRecipes.remove(subRecipe.id)
                    this.logger.log(`✅ Deleted recipe sub-recipe - ID: ${subRecipe.id}`)
                }
            }

            // Create or update sub-recipes
            await Promise.all(
                cleanRecipeSubRecipes.map(async (sr) => {
                    if (sr.id) {
                        // Update
                        await this.svcRecipeSubRecipes.update(sr.id, {
                            childRecipeId: sr.childRecipeId,
                            quantity: sr.quantity,
                        })
                        this.logger.log(`✅ Updated recipe sub-recipe - ID: ${sr.id}`)
                    } else {
                        // Create
                        const created = await this.svcRecipeSubRecipes.create({
                            parentRecipeId: id,
                            childRecipeId: sr.childRecipeId,
                            quantity: sr.quantity,
                        })
                        const subRecipeIdStr = ((created as unknown) as { _id?: { toString(): string } })._id?.toString() || ''
                        this.logger.log(`✅ Created recipe sub-recipe - ID: ${subRecipeIdStr}, parentRecipeId: ${id}`)
                    }
                }),
            )
        }

        this.logger.log(`✅ Complete updateWithRelations - Recipe: ${id}`)
        return this.findDetailedRecipe(id)
    }

}
