import * as mongoose from 'mongoose';

import { FoodSchema } from '../src/domain/food/schemas/food.schema';
import { MeasureSchema } from '../src/domain/food/schemas/measure.schema';
import { RecipeCategory } from '../src/domain/recipe/enums/recipe-category.enum';
import { RecipeFoodSchema } from '../src/domain/recipe/schemas/recipe-food.schema';
import { RecipeSchema } from '../src/domain/recipe/schemas/recipe.schema';
import { seedRecipes } from './seed-recipes';

export async function seedDbRecipes(mongoUri: string) {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoUri);
        console.log('✓ Connected to MongoDB');

        const foodsModel = mongoose.model('Food', FoodSchema, 'foods');
        const measuresModel = mongoose.model('Measure', MeasureSchema, 'measures');
        const recipeModel = mongoose.model('Recipe', RecipeSchema, 'recipes');
        const recipeFoodsModel = mongoose.model('RecipeFood', RecipeFoodSchema, 'recipeFoods');

        console.log('Clearing existing recipes and recipesFoods');
        await recipeModel.deleteMany({});
        await recipeFoodsModel.deleteMany({});
        console.log('✓ Cleared existing data');

        console.log('Inserting seed data...');
        const result = await Promise.all(
            seedRecipes.map(async (recipeData) => {
                const createRecipeDTO = {
                    name: recipeData.name,
                    instructions: recipeData.instructions,
                    vegetarian: recipeData.vegetarian,
                    season: recipeData.season,
                    category: recipeData.category as RecipeCategory,
                    servings: recipeData.servings,
                };

                const recipe = await recipeModel.create(createRecipeDTO);

                for (const ingredient of recipeData.ingredients) {
                    const foodDoc = await foodsModel.findOne({ name: ingredient.ingredient }).exec();
                    if (!foodDoc) {
                        throw new Error(`Food not found: ${ingredient.ingredient}`);
                    }
                    const measureDoc = await measuresModel.findOne({ foodId: foodDoc._id, label: ingredient.unit }).exec();
                    if (!measureDoc) {
                        throw new Error(`Measure not found: ${foodDoc.name} (id ${foodDoc._id.toString()}), Unit: ${ingredient.unit} from recipe: ${recipe.name}`);
                    }

                    const createRecipeFoodDTO = {
                        recipeId: recipe._id,
                        foodId: foodDoc._id,
                        measureId: measureDoc._id,
                        quantity: ingredient.quantity,
                    };

                    await recipeFoodsModel.create(createRecipeFoodDTO);
                }
            })
        );

        const countRecipeFoods = await recipeFoodsModel.countDocuments().exec();

        console.log(`✓ Inserted ${countRecipeFoods} recipe ingredients`);
        console.log(`✓ Inserted ${result.length} recipes`);
        console.log('\nRecipes seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding recipes:', error);
        throw error;
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}
