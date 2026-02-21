import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { RecipeCategory } from '../enums/recipe-category.enum'
import { RecipeSeason } from '../enums/recipe-season.enum'
import { RecipeVegetarianStatus } from '../enums/recipe-vegetarian-status.enum'

@Schema({ collection: 'recipes', timestamps: true })
export class Recipe {

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    instructions: string

    @Prop({
        type: String,
        enum: RecipeVegetarianStatus,
        default: RecipeVegetarianStatus.NON_VEGETARIAN,
        required: true,
    })
    vegetarianStatus: RecipeVegetarianStatus

    @Prop({
        type: [String],
        enum: RecipeSeason,
        default: [RecipeSeason.ALL_YEAR],
        required: true,
    })
    season: RecipeSeason[]

    @Prop({
        type: String,
        enum: RecipeCategory,
        required: true,
    })
    category: RecipeCategory

    @Prop({ required: true, min: 1 })
    servings: number

}

export type RecipeDocument = Recipe & Document
export const RecipeSchema = SchemaFactory.createForClass(Recipe)

RecipeSchema.set('toJSON', { virtuals: true })
RecipeSchema.set('toObject', { virtuals: true })
