import { PartialType } from '@nestjs/mapped-types'
import { IsString, IsNumber } from 'class-validator'
import { Types } from 'mongoose'

import { FoodCategory } from './../../../domain/food/enums/food-category.enum'
import { Nutrients } from './../../../domain/food/schemas/nutrients.schema'

export class CreateRecipeFoodDto {

    @IsString()
    recipeId: string

    @IsString()
    foodId: string

    @IsString()
    measureId: string

    @IsNumber()
    quantity: number

}

export class UpdateRecipeFoodDto extends PartialType(CreateRecipeFoodDto) {}

export interface IFood {
    _id: Types.ObjectId
    id: string
    name: string
    referenceUnit: string
    density: number
    nutrientsPer100: Nutrients
    needReview: boolean
    category: FoodCategory
}

export interface IMeasure {
    _id: Types.ObjectId
    id: string
    foodId: Types.ObjectId
    label: string
    grams: number
    isDefault: boolean
}

// FoodId populated interface - not used, just for reference
export interface IMeasurePopulated extends Omit<IMeasure, 'foodId'> {
    foodId: IFood
}

export interface IRecipeFood {
    _id: Types.ObjectId
    id: string
    recipeId: Types.ObjectId
    foodId: Types.ObjectId
    measureId: Types.ObjectId
    quantity: number
}

export interface IPopulatedRecipeFood extends Omit<IRecipeFood, 'foodId' | 'measureId'> {
    foodId: IFood
    measureId: IMeasure
}
