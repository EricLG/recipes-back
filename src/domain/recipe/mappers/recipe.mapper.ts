import { Injectable } from "@nestjs/common";


import { IPopulatedRecipeFood } from "./../../../api/recipe/dto/recipe-food-response.dto";
import { IPopulatedRecipeSubRecipe, IRecipe } from './../../../api/recipe/dto/recipe-sub-recipe-response.dto';
import { DetailedRecipeDto, DetailedRecipeFood, DetailedRecipeSubRecipe } from './../../../api/recipe/dto/response-recipe-food.dto';


@Injectable()
export class RecipeMapper {

    toDetailedRecipeDto(recipe: IRecipe, recipeFoods: IPopulatedRecipeFood[], subRecipes: IPopulatedRecipeSubRecipe[]): DetailedRecipeDto {
        const recipeId = recipe.id

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

    private mapRecipeFoods(recipeFoods: IPopulatedRecipeFood[]): DetailedRecipeFood[] {
        return recipeFoods.map((rf: IPopulatedRecipeFood) => ({
            id: rf.id,
            quantity: rf.quantity || 0,
            food: rf.foodId || {},
            measure: rf.measureId || {},
        }));
    }

    private mapRecipeSubRecipes(subRecipes: IPopulatedRecipeSubRecipe[]): DetailedRecipeSubRecipe[] {
        return subRecipes.map((sr: IPopulatedRecipeSubRecipe) => ({
            id: sr.id,
            parentRecipeId: sr.parentRecipeId,
            quantity: sr.quantity || 0,
            childRecipe: this.toDetailedRecipeDto(sr.childRecipeId, sr.childRecipeId?.recipeFoods ?? [], []),
        }));
    }

}
