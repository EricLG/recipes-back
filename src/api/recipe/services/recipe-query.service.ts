import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { Food } from '../../../domain/food/schemas/food.schema'
import { Measure } from '../../../domain/food/schemas/measure.schema'
import { RecipeCategory } from '../../../domain/recipe/enums/recipe-category.enum'
import { RecipeSeason } from '../../../domain/recipe/enums/recipe-season.enum'
import { Recipe, RecipeDocument } from '../../../domain/recipe/schemas/recipe.schema'

interface DetailedRecipeFoodDto {
    _id: Types.ObjectId
    food: Food
    measure: Measure
    quantity: number

}

interface DetailedSubRecipeDto {
    _id: Types.ObjectId
    parentRecipeId: Types.ObjectId
    childRecipe: DetailedRecipeByAggregationDto
    quantity: number
}

export interface DetailedRecipeByAggregationDto {
    id: string
    name: string
    instructions: string
    vegetarian: boolean
    season: RecipeSeason[]
    category: RecipeCategory
    servings: number
    recipeFoods: DetailedRecipeFoodDto[]
    recipeSubRecipes: DetailedSubRecipeDto[]

}

/**
 * Deprecated service that demonstrates how to use MongoDB aggregation to retrieve a recipe with all its related data in a single query.
 * This approach is more efficient than multiple queries but can be complex to maintain. It is kept for demonstration purposes and is not used in the current implementation.
 */
@Injectable()
export class RecipeQueryService {

    constructor(
        @InjectModel(Recipe.name) private readonly recipeModel: Model<RecipeDocument>,
    ) {}

    /*
     * Not used anymore, keeping for demo effects
     * Get a detailed recipe by its ID, including its foods, measures, and sub-recipes
     * @param recipeId The ID of the recipe to retrieve
     * @returns A DetailedRecipeByAggregationDto containing the recipe details
     * @throws NotFoundException if the recipe with the given ID does not exist
    */
    async getDetailedRecipe(recipeId: string): Promise<DetailedRecipeByAggregationDto> {
        const result: DetailedRecipeByAggregationDto[] = await this.recipeModel.aggregate([
            { $match: { _id: new Types.ObjectId(recipeId) } },
            {
                $lookup: {
                    from: 'recipeFoods',
                    localField: '_id',
                    foreignField: 'recipeId',
                    as: 'recipeFoods',
                },
            },
            {
                $lookup: {
                    from: 'measures',
                    localField: 'recipeFoods.measureId',
                    foreignField: '_id',
                    as: 'measures',
                },
            },
            {
                $lookup: {
                    from: 'foods',
                    localField: 'measures.foodId',
                    foreignField: '_id',
                    as: 'foods',
                },
            },
            {
                $addFields: {
                    recipeFoods: {
                        $map: {
                            input: '$recipeFoods',
                            as: 'rf',
                            in: {
                                _id: '$$rf._id',
                                quantity: '$$rf.quantity',

                                measure: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: '$measures',
                                                as: 'm',
                                                cond: { $eq: ['$$m._id', '$$rf.measureId'] },
                                            },
                                        },
                                        0,
                                    ],
                                },
                                food: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: '$foods',
                                                as: 'f',
                                                cond: {
                                                    $eq: [
                                                        '$$f._id',
                                                        {
                                                            $arrayElemAt: [
                                                                {
                                                                    $map: {
                                                                        input: { $filter: { input: '$measures', as: 'm', cond: { $eq: ['$$m._id', '$$rf.measureId'] } } },
                                                                        as: 'm',
                                                                        in: '$$m.foodId',
                                                                    },
                                                                },
                                                                0,
                                                            ],
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        0,
                                    ],
                                },
                            },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'recipeSubRecipes',
                    localField: '_id',
                    foreignField: 'parentRecipeId',
                    as: 'recipeSubRecipes',
                },
            },
            {
                $lookup: {
                    from: 'recipes',
                    localField: 'recipeSubRecipes.childRecipeId',
                    foreignField: '_id',
                    as: 'childRecipes',
                },
            },
            {
                $lookup: {
                    from: 'recipeFoods',
                    localField: 'childRecipes._id',
                    foreignField: 'recipeId',
                    as: 'childRecipeFoods',
                },
            },
            {
                $lookup: {
                    from: 'measures',
                    localField: 'childRecipeFoods.measureId',
                    foreignField: '_id',
                    as: 'childMeasures',
                },
            },
            {
                $lookup: {
                    from: 'foods',
                    localField: 'childMeasures.foodId',
                    foreignField: '_id',
                    as: 'childFoods',
                },
            },
            {
                $addFields: {
                    recipeSubRecipes: {
                        $map: {
                            input: '$recipeSubRecipes',
                            as: 'sr',
                            in: {
                                _id: '$$sr._id',
                                parentRecipeId: '$$sr.parentRecipeId',
                                quantity: '$$sr.quantity',
                                childRecipe: {
                                    $let: {
                                        vars: {
                                            recipe: {
                                                $arrayElemAt: [{ $filter: { input: '$childRecipes', as: 'r', cond: { $eq: ['$$r._id', '$$sr.childRecipeId'] } } }, 0],
                                            },
                                        },
                                        in: {
                                            _id: '$$recipe._id',
                                            name: '$$recipe.name',
                                            instructions: '$$recipe.instructions',
                                            vegetarian: '$$recipe.vegetarian',
                                            season: '$$recipe.season',
                                            category: '$$recipe.category',
                                            servings: '$$recipe.servings',
                                            recipeFoods: {
                                                $map: {
                                                    input: { $filter: { input: '$childRecipeFoods', as: 'rf', cond: { $eq: ['$$rf.recipeId', '$$recipe._id'] } } },
                                                    as: 'rf',
                                                    in: {
                                                        _id: '$$rf._id',
                                                        quantity: '$$rf.quantity',
                                                        measure: {
                                                            $arrayElemAt: [{ $filter: { input: '$childMeasures', as: 'm', cond: { $eq: ['$$m._id', '$$rf.measureId'] } } }, 0],
                                                        },
                                                        food: {
                                                            $arrayElemAt: [
                                                                {
                                                                    $filter: {
                                                                        input: '$childFoods',
                                                                        as: 'f',
                                                                        cond: {
                                                                            $eq: [
                                                                                '$$f._id',
                                                                                {
                                                                                    $arrayElemAt: [
                                                                                        {
                                                                                            $map: {
                                                                                                input: { $filter: { input: '$childMeasures', as: 'm', cond: { $eq: ['$$m._id', '$$rf.measureId'] } } },
                                                                                                as: 'm',
                                                                                                in: '$$m.foodId',
                                                                                            },
                                                                                        },
                                                                                        0,
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                    },
                                                                },
                                                                0,
                                                            ],
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    name: 1,
                    instructions: 1,
                    vegetarian: 1,
                    season: 1,
                    category: 1,
                    servings: 1,
                    recipeFoods: 1,
                    recipeSubRecipes: 1,
                },
            },
        ])

        if (!result.length) {
            throw new NotFoundException(`Recipe ${recipeId} not found`)
        }

        return result[0]
    }

}
