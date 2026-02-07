import { Types } from 'mongoose'

import { Nutrients } from '../../../domain/food/schemas/nutrients.schema'

export interface IFood {
    _id: Types.ObjectId
    id: string
    name: string
    referenceUnit: string
    density: number
    nutrientsPer100: Nutrients
    needReview: boolean
    category: string
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
