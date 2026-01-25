import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ collection: 'recipeSubRecipes', timestamps: true })
export class RecipeSubRecipe {

  @Prop({ type: Types.ObjectId, ref: 'Recipe', required: true })
      parentRecipeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Recipe', required: true })
      childRecipeId: Types.ObjectId;

  @Prop({ required: true, min: 0 })
      quantity: number;
}

export type RecipeSubRecipeDocument = RecipeSubRecipe & Document;
export const RecipeSubRecipeSchema = SchemaFactory.createForClass(RecipeSubRecipe);

RecipeSubRecipeSchema.set('toJSON', { virtuals: true });
RecipeSubRecipeSchema.set('toObject', { virtuals: true });
