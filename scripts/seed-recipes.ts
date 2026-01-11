export interface RecipeItf {
    name: string;
    instructions: string;
    season?: string; // Should match RecipeSeason enum values, ALL_SEASONS if not specified or not recognized
    vegetarian: boolean;
    servings: number; // Changed from nbParts to servings
    category: string; // Should match RecipeCategory enum values, OTHER if not specified or not recognized

}

export interface RecipeFoodItf {
    recipeId: string; // Will be the recipe name attribute, resolved to ObjectId during import
    foodId: string; // Will be the food name attribute, resolved to ObjectId during import
    measureId: string;
    quantity: number;

}

export interface MeasureItf {
    foodId: string; // Will be the food name attribute, resolved to ObjectId during import
    label: string;
    grams: number;
    isDefault: boolean;

}
