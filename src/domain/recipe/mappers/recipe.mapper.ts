import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";

import { Recipe } from '../schemas/recipe.schema';
import { DetailedRecipeDto } from './../../../api/recipe/dto/response-recipe-food.dto';
import { Food } from './../../food/schemas/food.schema';
import { Measure } from './../../food/schemas/measure.schema';

export type LeanRecipe = Recipe & { _id: Types.ObjectId };
export type LeanRecipeFood = {
    _id: string;
    recipeId: string;
    quantity: number;
    measureId: Measure & { foodId: Food };
    };

export type LeanSubRecipe = {
    _id: string;
    parentRecipeId: string;
    quantity: number;
    childRecipeId: LeanRecipe & {
        recipeFoods?: LeanRecipeFood[];
    };
};


@Injectable()
export class RecipeMapper {

    toDetailedRecipeDto(recipe: LeanRecipe, recipeFoods: LeanRecipeFood[], subRecipes: LeanSubRecipe[]): DetailedRecipeDto {
        return {
            id: recipe._id.toString(),
            name: recipe.name,
            instructions: recipe.instructions,
            vegetarian: recipe.vegetarian,
            season: recipe.season,
            category: recipe.category,
            servings: recipe.servings,

            recipeFoods: recipeFoods.map(rf => ({
                _id: rf._id,
                quantity: rf.quantity,
                food: rf.measureId.foodId,
                measure: rf.measureId
            })),
            recipeSubRecipes: subRecipes.map(sr => ({
                _id: sr._id,
                parentRecipeId: sr.parentRecipeId,
                quantity: sr.quantity,
                childRecipe: this.toDetailedRecipeDto(sr.childRecipeId, sr.childRecipeId.recipeFoods ?? [], []) // récursion contrôlée (ou lazy)
            }))
        };
    }
}
