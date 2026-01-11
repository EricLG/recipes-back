import * as dotenv from 'dotenv';

import { seedDbFoods } from './seed-db-food';

dotenv.config();
const user = process.env.MONGODB_USER;
const pwd = process.env.MONGODB_PWD;
const host = process.env.MONGODB_HOST;
const mongoUri = 'mongodb://' + user + ':' + pwd + '@' + host + '/recipes?authSource=recipes';

async function seedAll(mongoUri: string) {
    try {
        console.log('Starting full database seeding...\n');

        await seedDbFoods(mongoUri);
        console.log('\n--- Foods seeding completed ---\n');

        // await seedDbRecipes();
        // console.log('\n--- Recipes seeding completed ---\n');

        console.log('🎉 Full seeding completed successfully!');
    } catch (error) {
        console.error('Error during full seeding:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    seedAll(mongoUri);
}
