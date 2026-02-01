import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";

import { Recipe } from '../schemas/recipe.schema';
import { DetailedRecipeDto, DetailedRecipeFood, DetailedRecipeSubRecipe } from './../../../api/recipe/dto/response-recipe-food.dto';
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

    toDetailedRecipeDto(recipe: Recipe | LeanRecipe, recipeFoods: any[], subRecipes: any[]): DetailedRecipeDto {
        const recipeId = this.getId(recipe);

        return {
            id: recipeId,
            name: recipe.name,
            instructions: recipe.instructions,
            vegetarian: recipe.vegetarian,
            season: recipe.season,
            category: recipe.category,
            servings: recipe.servings,
            recipeFoods: this.mapRecipeFoods(recipeFoods),
            recipeSubRecipes: this.mapRecipeSubRecipes(subRecipes),
        };
    }

    private getId(doc: any): string {
        if (doc == null) return '';
        if (typeof doc._id === 'string') {
            return doc._id;
        }
        if (doc._id && typeof doc._id.toString === 'function') {
            return doc._id.toString();
        }
        if (typeof doc.id === 'string') {
            return doc.id;
        }
        return '';
    }

    private mapRecipeFoods(recipeFoods: any[]): DetailedRecipeFood[] {
        return recipeFoods.map((rf: any) => ({
            id: this.getId(rf),
            quantity: (rf.quantity as number) || 0,
            food: rf.food || {},
            measure: rf.measure || {},
        }));
    }

    private mapRecipeSubRecipes(subRecipes: any[]): DetailedRecipeSubRecipe[] {
        return subRecipes.map((sr: any) => ({
            id: this.getId(sr),
            parentRecipeId: this.getId(sr.parentRecipeId),
            quantity: (sr.quantity as number) || 0,
            childRecipe: this.toDetailedRecipeDto(sr.childRecipeId, sr.childRecipeId?.recipeFoods ?? [], []),
        }));
    }

}
