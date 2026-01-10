import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'ingredients', timestamps: true })
export class Ingredient {
    @Prop({ required: true })
    name: string;

    @Prop({ default: 0 })
    kiloCalories?: number;

    @Prop({ default: 0 })
    proteins?: number;

    @Prop({ default: 0 })
    carbohydrates?: number;

    @Prop({ default: 0 })
    fats?: number;

    @Prop({ default: 0 })
    fibers?: number;

    @Prop({ default: 0 })
    totalSugars?: number;

    @Prop({ default: false })
    needReview?: boolean;
}

export type IngredientDocument = Ingredient & Document;
export const IngredientSchema = SchemaFactory.createForClass(Ingredient);

IngredientSchema.set('toJSON', { virtuals: true });
