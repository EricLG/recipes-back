import { Types } from "mongoose";

import { RecipeCategory } from './../../../domain/recipe/enums/recipe-category.enum';
import { RecipeSeason } from './../../../domain/recipe/enums/recipe-season.enum';
import { IPopulatedRecipeFood } from "./recipe-food-response.dto";

export interface IRecipe {
    _id: Types.ObjectId;
    id: string; // virtual
    name: string;
    instructions: string;
    vegetarian: boolean;
    season: RecipeSeason;
    category: RecipeCategory;
    servings: number;
    recipeFoods?: IPopulatedRecipeFood[]; // optional, populated separately
}


export interface IRecipeSubRecipe {
    _id: Types.ObjectId;
    id: string;
    parentRecipeId: Types.ObjectId;
    childRecipeId: Types.ObjectId;
    quantity: number;
}

export interface IPopulatedRecipeSubRecipe extends Omit<IRecipeSubRecipe, 'childRecipeId'> {
    childRecipeId: IRecipe;
}

