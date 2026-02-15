import * as dotenv from 'dotenv'

import { seedDbFoods } from './seed-db-food'
import { seedDbRecipes } from './seed-db-recipes'

dotenv.config()
const mongoUri = process.env.MONGODB_URI

async function seedAll(mongoUri: string) {
    try {
        console.log('Starting full database seeding...\n')

        await seedDbFoods(mongoUri)
        console.log('\n--- Foods seeding completed ---\n')

        await seedDbRecipes(mongoUri)
        console.log('\n--- Recipes seeding completed ---\n')

        console.log('🎉 Full seeding completed successfully!')
    } catch (error) {
        console.error('Error during full seeding:', error)
        process.exit(1)
    }
}

if (require.main === module && mongoUri) {
    seedAll(mongoUri)
}
