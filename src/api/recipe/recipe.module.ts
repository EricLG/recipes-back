import { BadRequestException, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { v4 as uuidv4 } from 'uuid'

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
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads/recipes', // dossier de stockage
                filename: (req, file, cb) => {
                    // Nom unique pour éviter les collisions
                    const uuid = uuidv4()

                    const uniqueName = `${uuid}${extname(file.originalname)}`
                    cb(null, uniqueName)
                },
            }),
            fileFilter: (req, file, cb) => {
                // Accepte uniquement les images
                if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
                    return cb(new BadRequestException('Format d\'image non supporté'), false)
                }
                cb(null, true)
            },
            limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
        }),
    ],
    controllers: [RecipesController, RecipeFoodsController, RecipeSubRecipesController],
    providers: [RecipesService, RecipeFoodsService, RecipeSubRecipesService, RecipeMapper],
    exports: [RecipesService, RecipeFoodsService, RecipeSubRecipesService, RecipeMapper],
})
export class RecipeModule {}
