import { Types } from 'mongoose';

import { Food } from './../../../domain/food/schemas/food.schema';
import { Measure } from './../../../domain/food/schemas/measure.schema';
import { RecipeCategory } from './../../../domain/recipe/enums/recipe-category.enum';
import { RecipeSeason } from './../../../domain/recipe/enums/recipe-season.enum';
import { Recipe } from './../../../domain/recipe/schemas/recipe.schema';

export interface PopulatedRecipeFood {
    _id: string;
    recipeId: string;
    measureId: Measure & { foodId: Food };
    quantity: number;
}

export interface PopulatedRecipeSubRecipe {
    _id: string;
    parentRecipeId: string;
    childRecipeId: Recipe & { _id: Types.ObjectId; recipeFoods?: PopulatedRecipeFood[] };
    quantity: number;
}

export interface DetailedRecipeFood {
    _id: string;
    quantity: number;
    food: Food;
    measure: Measure & { foodId: Food };
}

export interface DetailedRecipeSubRecipe {
    _id: string;
    parentRecipeId: string;
    quantity: number;
    childRecipe: DetailedRecipeDto;
}

export interface DetailedRecipeDto {
    id: string;
    name: string;
    instructions: string;
    vegetarian: boolean;
    season: RecipeSeason;
    category: RecipeCategory;
    servings: number;
    recipeFoods: DetailedRecipeFood[];
    recipeSubRecipes: DetailedRecipeSubRecipe[];
}
