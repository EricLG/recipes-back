import * as mongoose from 'mongoose';
import { seedRecipes } from './seed-recipes';
import { RecipeSchema } from '../src/api/recipes/schemas/recipe.schema';
import { IngredientSchema } from '../src/api/ingredients/schemas/ingredient.schema';
import * as dotenv from 'dotenv';

dotenv.config();
const user = process.env.MONGODB_USER;
const pwd = process.env.MONGODB_PWD;
const host = process.env.MONGODB_HOST;
const mongoUri = 'mongodb://' + user + ':' + pwd + '@' + host + '/recipes?authSource=recipes';

async function seedDbRecipes() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoUri);
        console.log('✓ Connected to MongoDB');

        const ingredientModel = mongoose.model('Ingredient', IngredientSchema, 'ingredients');
        const recipeModel = mongoose.model('Recipe', RecipeSchema, 'recipes');

        console.log('Clearing existing recipes...');
        await recipeModel.deleteMany({});
        console.log('✓ Cleared existing recipes');

        console.log('Resolving ingredient names to ObjectIds...');
        const processedRecipes = await Promise.all(
            seedRecipes.map(async (recipeData) => {
                const processedIngredients = await Promise.all(
                    recipeData.ingredients.map(async (ing) => {
                        const ingredientDoc = await ingredientModel.findOne({ name: ing.ingredient }).exec();
                        if (!ingredientDoc) {
                            throw new Error(`Ingredient not found: ${ing.ingredient}`);
                        }
                        return {
                            ingredient: ingredientDoc._id,
                            quantity: ing.quantity,
                            unit: ing.unit,
                        };
                    })
                );

                return {
                    ...recipeData,
                    ingredients: processedIngredients,
                };
            })
        );

        console.log('Inserting processed recipes...');
        const result = await recipeModel.insertMany(processedRecipes);
        console.log(`✓ Successfully inserted ${result.length} recipes`);

        console.log('\nRecipes seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding recipes:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

seedDbRecipes();
