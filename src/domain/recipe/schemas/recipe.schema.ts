import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { RecipeCategory } from '../enums/recipe-category.enum'
import { RecipeSeason } from '../enums/recipe-season.enum'
import { RecipeVegetarianStatus } from '../enums/recipe-vegetarian-status.enum'
import { RecipeStatus } from '../enums/recipe-status.enum'

@Schema({ collection: 'recipes', timestamps: true })
export class Recipe {

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    instructions: string

    @Prop({
        type: String,
        enum: RecipeStatus,
        default: RecipeStatus.DRAFT,
        required: true,
    })
    status: RecipeStatus

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
        default: [RecipeSeason.SPRING, RecipeSeason.SUMMER, RecipeSeason.AUTUMN, RecipeSeason.WINTER],
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

    @Prop({ type: Number, required: false })
    preparationTime?: number // Time in minutes

    @Prop()
    kitchenTools: string

    @Prop()
    remark: string

    @Prop({ required: false, default: '' })
    imageUrl: string // Chemin ou URL vers l'image

}

export type RecipeDocument = Recipe & Document
export const RecipeSchema = SchemaFactory.createForClass(Recipe)

RecipeSchema.set('toJSON', { virtuals: true })
RecipeSchema.set('toObject', { virtuals: true })
