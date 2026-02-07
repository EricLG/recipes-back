/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { RecipeFoodsService } from './recipe-foods.service'
import { RecipeSubRecipe, RecipeSubRecipeDocument } from '../../../domain/recipe/schemas/recipe-sub-recipe.schema'
import { Recipe } from '../../../domain/recipe/schemas/recipe.schema'
import { IPopulatedRecipeFood } from '../dto/recipe-food.dto'
import { CreateRecipeSubRecipeDto, IPopulatedRecipeSubRecipe, IRecipe, UpdateRecipeSubRecipeDto } from '../dto/recipe-sub-recipe.dto'

@Injectable()
export class RecipeSubRecipesService {

    private readonly logger = new Logger(RecipeSubRecipesService.name)

    constructor(
        @InjectModel(RecipeSubRecipe.name) private recipeSubRecipeModel: Model<RecipeSubRecipeDocument>,
        @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
        private readonly recipeFoodsService: RecipeFoodsService,
    ) {}

    async create(createDto: CreateRecipeSubRecipeDto): Promise<RecipeSubRecipe> {
    // Check if parent and child recipes exist
        const parentExists = await this.recipeModel.findById(createDto.parentRecipeId)
        if (!parentExists) {
            throw new NotFoundException(`Parent recipe with ID ${createDto.parentRecipeId} not found`)
        }
        const childExists = await this.recipeModel.findById(createDto.childRecipeId)
        if (!childExists) {
            throw new NotFoundException(`Child recipe with ID ${createDto.childRecipeId} not found`)
        }

        // Prevent self-reference
        if (createDto.parentRecipeId === createDto.childRecipeId) {
            throw new NotFoundException('A recipe cannot reference itself as a sub-recipe')
        }

        // Check for cycles
        if (await this.wouldCreateCycle(createDto.parentRecipeId, createDto.childRecipeId)) {
            throw new NotFoundException('Adding this sub-recipe would create a cycle')
        }

        // Convert string IDs to ObjectId
        const dtoWithObjectIds = {
            ...createDto,
            parentRecipeId: new Types.ObjectId(createDto.parentRecipeId),
            childRecipeId: new Types.ObjectId(createDto.childRecipeId),
        }

        const created = new this.recipeSubRecipeModel(dtoWithObjectIds)
        const saved = await created.save()
        this.logger.log(`✅ Created recipe sub-recipe - ID: ${saved.id}, parentRecipeId: ${createDto.parentRecipeId}, childRecipeId: ${createDto.childRecipeId}, quantity: ${createDto.quantity}`)
        return saved
    }

    async findAll(): Promise<RecipeSubRecipe[]> {
        return this.recipeSubRecipeModel.find().exec()
    }

    async findOne(id: string): Promise<RecipeSubRecipe> {
        const subRecipe = await this.recipeSubRecipeModel.findById(id).exec()
        if (!subRecipe) {
            throw new NotFoundException(`RecipeSubRecipe with ID ${id} not found`)
        }
        return subRecipe
    }

    async update(id: string, updateDto: UpdateRecipeSubRecipeDto): Promise<RecipeSubRecipe> {
    // If updating parent or child, check existence and cycles
        if (updateDto.parentRecipeId || updateDto.childRecipeId) {
            const existing = await this.findOne(id)
            const newParentId = updateDto.parentRecipeId || existing.parentRecipeId.toString()
            const newChildId = updateDto.childRecipeId || existing.childRecipeId.toString()

            const parentExists = await this.recipeModel.findById(newParentId)
            if (!parentExists) {
                throw new NotFoundException(`Parent recipe with ID ${newParentId} not found`)
            }
            const childExists = await this.recipeModel.findById(newChildId)
            if (!childExists) {
                throw new NotFoundException(`Child recipe with ID ${newChildId} not found`)
            }

            if (newParentId === newChildId) {
                throw new NotFoundException('A recipe cannot reference itself as a sub-recipe')
            }

            if (await this.wouldCreateCycle(newParentId, newChildId, id)) {
                throw new NotFoundException('Updating this sub-recipe would create a cycle')
            }
        }

        // Convert string IDs to ObjectId if present
        const updateData: any = { ...updateDto }
        if (updateDto.parentRecipeId) {
            updateData.parentRecipeId = new Types.ObjectId(updateDto.parentRecipeId)
        }
        if (updateDto.childRecipeId) {
            updateData.childRecipeId = new Types.ObjectId(updateDto.childRecipeId)
        }

        const updated = await this.recipeSubRecipeModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .exec()
        if (!updated) {
            throw new NotFoundException(`RecipeSubRecipe with ID ${id} not found`)
        }
        this.logger.log(`✅ Updated recipe sub-recipe - ID: ${id}`)
        return updated
    }

    async remove(id: string): Promise<void> {
        const result = await this.recipeSubRecipeModel.findByIdAndDelete(id).exec()
        if (!result) {
            throw new NotFoundException(`RecipeSubRecipe with ID ${id} not found`)
        }
        this.logger.log(`✅ Deleted recipe sub-recipe - ID: ${id}`)
    }

    private async wouldCreateCycle(parentId: string, childId: string, excludeId?: string): Promise<boolean> {
    // Check if childId is an ancestor of parentId
        const visited = new Set<string>()
        const stack = [childId]

        while (stack.length > 0) {
            const current = stack.pop()!
            if (visited.has(current)) continue
            visited.add(current)

            if (current === parentId) {
                return true // Cycle detected
            }

            // Find all sub-recipes where current is parent
            const subRecipes = await this.recipeSubRecipeModel.find({
                parentRecipeId: current,
                ...(excludeId && { _id: { $ne: excludeId } }),
            }).exec()

            for (const sub of subRecipes) {
                stack.push(sub.childRecipeId.toString())
            }
        }

        return false
    }

    async findByParentRecipeId(recipeId: string): Promise<IPopulatedRecipeSubRecipe[]> {
        const subRecipes = await this.recipeSubRecipeModel.find({ parentRecipeId: new Types.ObjectId(recipeId) })
            .populate<{ childRecipeId: IRecipe }>('childRecipeId')
            .exec()

        const populatedSubRecipes = subRecipes as IPopulatedRecipeSubRecipe[]

        await Promise.all(populatedSubRecipes.map(async (subRecipe) => {
            const recipeFoods: IPopulatedRecipeFood[] = await this.recipeFoodsService.findByRecipeId(subRecipe.childRecipeId._id.toString())

            subRecipe.childRecipeId.recipeFoods = recipeFoods
        }))

        return populatedSubRecipes
    }

    async findAllByParentRecipeId(parentRecipeId: string): Promise<RecipeSubRecipe[]> {
        return this.recipeSubRecipeModel.find({ parentRecipeId: new Types.ObjectId(parentRecipeId) }).exec()
    }

}
