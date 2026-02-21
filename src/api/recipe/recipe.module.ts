import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { RecipeFoodsController } from './controllers/recipe-foods.controller'
import { RecipeSubRecipesController } from './controllers/recipe-sub-recipes.controller'
import { RecipesController } from './controllers/recipes.controller'
import { RecipeFoodsService } from './services/recipe-foods.service'
import { RecipeSubRecipesService } from './services/recipe-sub-recipes.service'
import { RecipesService } from './services/recipes.service'
import { RecipeMapper } from '../../domain/recipe/mappers/recipe.mapper'
import { RecipeFood, RecipeFoodSchema } from '../../domain/recipe/schemas/recipe-food.schema'
import { RecipeSubRecipe, RecipeSubRecipeSchema } from '../../domain/recipe/schemas/recipe-sub-recipe.schema'
import { Recipe, RecipeSchema } from '../../domain/recipe/schemas/recipe.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Recipe.name, schema: RecipeSchema },
            { name: RecipeFood.name, schema: RecipeFoodSchema },
            { name: RecipeSubRecipe.name, schema: RecipeSubRecipeSchema },
        ]),
    ],
    controllers: [RecipesController, RecipeFoodsController, RecipeSubRecipesController],
    providers: [RecipesService, RecipeFoodsService, RecipeSubRecipesService, RecipeMapper],
    exports: [RecipesService, RecipeFoodsService, RecipeSubRecipesService, RecipeMapper],
})
export class RecipeModule {}
