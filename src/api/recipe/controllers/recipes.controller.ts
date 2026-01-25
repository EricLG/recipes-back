import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Recipe } from './../../../domain/recipe/schemas/recipe.schema';
import { CreateRecipeDto } from './../dto/create-recipe.dto';
import { DetailedRecipeDto } from './../dto/response-recipe-food.dto';
import { UpdateRecipeDto } from './../dto/update-recipe.dto';
import { DetailedRecipeByAggregationDto, RecipeQueryService } from './../services/recipe-query.service';
import { RecipesService } from './../services/recipes.service';

@Controller('recipes')
export class RecipesController {
    constructor(
        private readonly svcRecipes: RecipesService,
        private readonly svcRecipeQuery: RecipeQueryService,
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

    @Get('detail/:id')
    async findDetailedRecipe(@Param('id') id: string): Promise<DetailedRecipeDto> {
        return await this.svcRecipes.findDetailedRecipe(id);
    }

    // For reference only - use aggregation
    @Get(':id/detail')
    async getDetailedRecipe(@Param('id') id: string): Promise<DetailedRecipeByAggregationDto> {
        return await this.svcRecipeQuery.getDetailedRecipe(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
        return this.svcRecipes.update(id, updateRecipeDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.svcRecipes.remove(id);
    }

}
