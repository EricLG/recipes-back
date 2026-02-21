import { PartialType } from '@nestjs/mapped-types'
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator'
import { Types } from 'mongoose'

import { Food } from '../../../domain/food/schemas/food.schema'
import { Measure } from '../../../domain/food/schemas/measure.schema'
import { RecipeCategory } from '../../../domain/recipe/enums/recipe-category.enum'
import { RecipeSeason } from '../../../domain/recipe/enums/recipe-season.enum'
import { Recipe } from '../../../domain/recipe/schemas/recipe.schema'
import { RecipeVegetarianStatus } from './../../../domain/recipe/enums/recipe-vegetarian-status.enum'

export class CreateRecipeDto {

    @IsString()
    name: string

    @IsString()
    instructions: string

    @IsEnum(RecipeVegetarianStatus)
    vegetarianStatus: RecipeVegetarianStatus

    @IsArray()
    @IsEnum(RecipeSeason, { each: true })
    season: RecipeSeason[]

    @IsEnum(RecipeCategory)
    category: RecipeCategory

    @IsNumber()
    servings: number

}

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {}

export interface PopulatedRecipeFood {
    _id: Types.ObjectId
    id: string
    recipeId: string
    measure: Measure
    food: Food
    quantity: number
}

export interface PopulatedRecipeSubRecipe {
    _id: string
    parentRecipeId: string
    childRecipeId: Recipe & { _id: Types.ObjectId, recipeFoods?: PopulatedRecipeFood[] }
    quantity: number
}

export interface DetailedRecipeFood {
    id: string
    quantity: number
    food: Food
    measure: Measure
}

export interface DetailedRecipeSubRecipe {
    id: string
    parentRecipeId: Types.ObjectId
    quantity: number
    childRecipe: DetailedRecipeDto
}

export interface DetailedRecipeDto {
    id: string
    name: string
    instructions: string
    vegetarianStatus: RecipeVegetarianStatus
    season: RecipeSeason[]
    category: RecipeCategory
    servings: number
    recipeFoods: DetailedRecipeFood[]
    recipeSubRecipes: DetailedRecipeSubRecipe[]
}
