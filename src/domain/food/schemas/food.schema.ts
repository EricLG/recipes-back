import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Nutrients } from './nutrients.schema';

@Schema({ collection: 'foods', timestamps: true })
export class Food {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, default: 'g' })
    referenceUnit: string;

    @Prop({ required: true, default: 1 })
    density: number;

    @Prop({ type: Nutrients, required: true })
    nutrientsPer100: Nutrients;

    @Prop({ required: true, default: false })
    needReview: boolean;
}

export type FoodDocument = Food & Document;
export const FoodSchema = SchemaFactory.createForClass(Food);

FoodSchema.set('toJSON', { virtuals: true });
