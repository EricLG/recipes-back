import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Recipe } from './../../../domain/recipe/schemas/recipe.schema';
import { CreateRecipeDto } from './../dto/create-recipe.dto';
import { DetailedRecipeDto } from './../dto/response-recipe-food.dto';
import { UpdateRecipeDto } from './../dto/update-recipe.dto';
import { RecipeFoodsService } from './../services/recipe-foods.service';
import { RecipesService } from './../services/recipes.service';

@Controller('recipes')
export class RecipesController {
    constructor(
        private readonly svcRecipes: RecipesService,
        private readonly svcRecipeFoods: RecipeFoodsService
    ) {}

    @Post()
    async create(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return this.svcRecipes.create(createRecipeDto);
    }

    @Get()
    async findAll(): Promise<Recipe[]> {
        return this.svcRecipes.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Recipe> {
        return this.svcRecipes.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
        return this.svcRecipes.update(id, updateRecipeDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.svcRecipes.remove(id);
    }

    @Get('detail/:id')
    async findDetailedRecipe(@Param('id') id: string): Promise<DetailedRecipeDto> {
        const recipe = await this.svcRecipes.findOne(id);
        const recipefoods = await this.svcRecipeFoods.findByRecipeId(id);

        return {
            id,
            name: recipe.name,
            instructions: recipe.instructions,
            vegetarian: recipe.vegetarian,
            season: recipe.season,
            category: recipe.category,
            servings: recipe.servings,
            measures: recipefoods
        };;
    }
}
