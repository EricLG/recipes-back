import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { WeeklyPlanRecipeSource } from '../enums/weekly-plan-recipe-source.enum'

@Schema({ _id: false })
export class WeeklyRecipePlanItem {

    @Prop({ type: Types.ObjectId, ref: 'Recipe', required: true })
    recipeId: Types.ObjectId

    @Prop({ required: true })
    recipeName: string

    @Prop({ required: true, min: 1 })
    servings: number

    @Prop({ type: String, enum: WeeklyPlanRecipeSource, required: true })
    source: WeeklyPlanRecipeSource

    @Prop({ type: Date, default: null })
    cookedAt: Date | null

}

export const WeeklyRecipePlanItemSchema = SchemaFactory.createForClass(WeeklyRecipePlanItem)

@Schema({ collection: 'weeklyRecipePlans', timestamps: true, optimisticConcurrency: true })
export class WeeklyRecipePlan {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId

    @Prop({ required: true })
    weekStart: string

    @Prop({ required: true, min: 1, default: 24 })
    targetServings: number

    @Prop({ required: true, min: 0, default: 0 })
    totalServings: number

    @Prop({ required: true, min: 0, default: 24 })
    shortage: number

    @Prop({ required: true, min: 0, default: 0 })
    surplus: number

    @Prop({ type: [WeeklyRecipePlanItemSchema], default: [] })
    items: WeeklyRecipePlanItem[]

}

export type WeeklyRecipePlanDocument = WeeklyRecipePlan & Document
export const WeeklyRecipePlanSchema = SchemaFactory.createForClass(WeeklyRecipePlan)

WeeklyRecipePlanSchema.index({ userId: 1, weekStart: 1 }, { unique: true, name: 'user_week_unique' })
WeeklyRecipePlanSchema.set('toJSON', { virtuals: true })
WeeklyRecipePlanSchema.set('toObject', { virtuals: true })
