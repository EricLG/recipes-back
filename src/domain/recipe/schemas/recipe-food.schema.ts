import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'recipeFoods', timestamps: true })
export class RecipeFood {
    @Prop({ type: Types.ObjectId, ref: 'Recipe', required: true })
        recipeId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Food', required: true })
        foodId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Measure', required: true })
        measureId: Types.ObjectId;

    @Prop({ required: true })
        quantity: number;
}

export type RecipeFoodDocument = RecipeFood & Document;
export const RecipeFoodSchema = SchemaFactory.createForClass(RecipeFood);

RecipeFoodSchema.set('toJSON', { virtuals: true });
