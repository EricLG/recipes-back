import { CreateMeasureDto } from './../src/api/food/dto/create-measure.dto';
import { MeasureSchema } from './../src/domain/food/schemas/measure.schema';
import { FoodDocument, FoodSchema } from './../src/domain/food/schemas/food.schema';
import * as mongoose from 'mongoose';

import { seedFoods } from './seed-food';
import { seedRecipes, Ingredient } from './seed-measure';


export async function seedDbFoods(mongoUri: string) {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoUri);
        console.log('✓ Connected to MongoDB');

        const foodsModel = mongoose.model('Food', FoodSchema, 'foods');
        const measuresModel = mongoose.model('Measure', MeasureSchema, 'measures');

        console.log('Clearing existing foods and measures...');
        await foodsModel.deleteMany({});
        await measuresModel.deleteMany({});
        console.log('✓ Cleared existing data');

        console.log('Inserting food data...');
        const foodsSeeded = await foodsModel.insertMany(seedFoods);
        console.log(`✓ Successfully inserted ${foodsSeeded.length} foods`);

        console.log('Inserting measures data...');
        const createMeasureDto = convertToCreateMeasureDto(seedRecipes, foodsSeeded);
        const measuresResult = await measuresModel.insertMany(createMeasureDto);
        console.log(`✓ Successfully inserted ${measuresResult.length} measures`);

        console.log('\nSeed foods completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

function convertToCreateMeasureDto(ingredients: Ingredient[], foods: FoodDocument[]): CreateMeasureDto[] {
    return ingredients.map((ing) => {
        const foodIng = foods.find((f) => f.name === ing.ingredient);
        const grams  = unitToGramsMap[ing.unit] ? unitToGramsMap[ing.unit] : 1;

        if (!foodIng) {
            console.warn(`Warning: Food not found for ingredient "${ing.ingredient}". Using placeholder ID.`);
        }

        return {
            foodId: foodIng?.id as string || 'unknown food',
            label: ing.unit,
            grams,
        } as CreateMeasureDto
    });
}

const unitToGramsMap: { [key: string]: number } = {
    'càc' : 5,
    'dosette' : 15,
    'feuille' : 20,
    'gousse' : 6,
    'pièce' : 50,
    'pincée': 1,
    'tranches' : 40,
}
