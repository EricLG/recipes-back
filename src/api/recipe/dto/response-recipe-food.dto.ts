import { Types } from 'mongoose';

import { Food } from './../../../domain/food/schemas/food.schema';
import { Measure } from './../../../domain/food/schemas/measure.schema';
import { RecipeCategory } from './../../../domain/recipes/enums/recipe-category.enum';
import { RecipeSeason } from './../../../domain/recipes/enums/recipe-season.enum';

export interface PopulatedRecipeFood {
    recipeId: Types.ObjectId;
    measureId: Measure & { foodId: Food };
    quantity: number;
}

export interface DetailedRecipeDto {
    id: string;
    name: string;
    instructions: string;
    vegetarian?: boolean;
    season?: RecipeSeason;
    category: RecipeCategory;
    servings: number;
    measures:  PopulatedRecipeFood[];
}
