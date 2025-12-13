import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class QtyIngredient {
    @Prop({ type: Types.ObjectId, ref: 'Ingredient', required: true })
    ingredient: Types.ObjectId;

    @Prop()
    quantity?: number;

    @Prop()
    unit?: string;
}

@Schema({ collection: 'recipes', timestamps: true })
export class Recipe {
    @Prop({ required: true })
    name: string;

    @Prop([{ type: QtyIngredient }])
    ingredients: QtyIngredient[];

    @Prop([{ type: Types.ObjectId, ref: 'Recipe' }])
    subCourses?: Types.ObjectId[];

    @Prop({ required: true })
    instructions: string;

    @Prop()
    season?: string;

    @Prop({ required: true })
    vegetarian: boolean;

    @Prop({ required: true })
    nbParts: number;

    @Prop({ required: true })
    category: string;
}

export type RecipeDocument = Recipe & Document;
export const RecipeSchema = SchemaFactory.createForClass(Recipe);
RecipeSchema.virtual('id').get(function (this: RecipeDocument) {
    return this._id?.toString();
});
RecipeSchema.set('toJSON', { virtuals: true });
