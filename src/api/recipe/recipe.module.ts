import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesController } from './controllers/recipes.controller';
import { RecipeFoodsController } from './controllers/recipe-foods.controller';
import { RecipesService } from './services/recipes.service';
import { RecipeFoodsService } from './services/recipe-foods.service';
import { Recipe, RecipeSchema } from '../../domain/recipes/schemas/recipe.schema';
import { RecipeFood, RecipeFoodSchema } from '../../domain/recipes/schemas/recipe-food.schema';

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
