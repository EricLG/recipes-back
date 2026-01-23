import { RecipeFoodDocument } from './../../../domain/recipes/schemas/recipe-food.schema';

export class ResponseRecipeFoodDto {
    recipeId: string;
    foodId: {
        id: string;
        name: string;
        referenceUnit: string;
        density: number;
        nutrientsPer100: {
            calories: number;
            protein: number;
            carbs: number;
            fat: number;
        };
        needReview: boolean;
    };
    measureId: {
        label: string;
        grams: number;
        isDefault: boolean;
    };
    quantity: number;

    constructor(docs: RecipeFoodDocument) {
        Object.assign(this, docs);
    }
}
