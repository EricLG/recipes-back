import { IsMongoId, IsNumber, Min } from 'class-validator'
import { Types } from 'mongoose'

import { RecipeCategory } from './../../../domain/recipe/enums/recipe-category.enum'
import { RecipeSeason } from './../../../domain/recipe/enums/recipe-season.enum'
import { RecipeVegetarianStatus } from './../../../domain/recipe/enums/recipe-vegetarian-status.enum'
import { IPopulatedRecipeFood } from './recipe-food.dto'

export class CreateRecipeSubRecipeDto {

    @IsMongoId()
    parentRecipeId: string

    @IsMongoId()
    childRecipeId: string

    @IsNumber()
    @Min(0)
    quantity: number

}

export class UpdateRecipeSubRecipeDto {

    @IsMongoId()
    parentRecipeId?: string

    @IsMongoId()
    childRecipeId?: string

    @IsNumber()
    @Min(0)
    quantity?: number

}

export interface IRecipe {
    _id: Types.ObjectId
    id: string // virtual
    name: string
    instructions: string
    vegetarianStatus: RecipeVegetarianStatus
    season: RecipeSeason[]
    category: RecipeCategory
    servings: number
    recipeFoods?: IPopulatedRecipeFood[] // optional, populated separately
}

export interface IRecipeSubRecipe {
    _id: Types.ObjectId
    id: string
    parentRecipeId: Types.ObjectId
    childRecipeId: Types.ObjectId
    quantity: number
}

export interface IPopulatedRecipeSubRecipe extends Omit<IRecipeSubRecipe, 'childRecipeId'> {
    childRecipeId: IRecipe
}
