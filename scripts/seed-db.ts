import * as mongoose from 'mongoose';
import { seedIngredients } from './seed-ingredients';
import { IngredientSchema } from '../src/api/ingredients/schemas/ingredient.schema';

const user = process.env.MONGODB_USER;
const pwd = process.env.MONGODB_PWD;
const host = process.env.MONGODB_HOST;
const mongoUri = 'mongodb://' + user + ':' + pwd + '@' + host + '/recipes?authSource=recipes';

async function seedDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoUri);
        console.log('✓ Connected to MongoDB');

        const ingredientModel = mongoose.model('Ingredient', IngredientSchema, 'ingredients');

        console.log('Clearing existing ingredients...');
        await ingredientModel.deleteMany({});
        console.log('✓ Cleared existing data');

        console.log('Inserting seed data...');
        const result = await ingredientModel.insertMany(seedIngredients);
        console.log(`✓ Successfully inserted ${result.length} ingredients`);

        console.log('\nSeed completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

seedDatabase();
