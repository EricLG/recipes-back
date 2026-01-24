import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecipeFood, RecipeFoodSchema } from './../../domain/recipes/schemas/recipe-food.schema';
import { Recipe, RecipeSchema } from './../../domain/recipes/schemas/recipe.schema';
import { RecipeFoodsController } from './controllers/recipe-foods.controller';
import { RecipesController } from './controllers/recipes.controller';
import { RecipeFoodsService } from './services/recipe-foods.service';
import { RecipesService } from './services/recipes.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Recipe.name, schema: RecipeSchema },
            { name: RecipeFood.name, schema: RecipeFoodSchema },
        ]),
    ],
    controllers: [RecipesController, RecipeFoodsController],
    providers: [RecipesService, RecipeFoodsService],
    exports: [RecipesService, RecipeFoodsService],
})
export class RecipeModule {}
