import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Recipe } from './../../../domain/recipes/schemas/recipe.schema';
import { CreateRecipeDto } from './../dto/create-recipe.dto';
import { UpdateRecipeDto } from './../dto/update-recipe.dto';
import { RecipesService } from './../services/recipes.service';

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Post()
    async create(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return this.recipesService.create(createRecipeDto);
    }

    @Get()
    async findAll(): Promise<Recipe[]> {
        return this.recipesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Recipe> {
        return this.recipesService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
        return this.recipesService.update(id, updateRecipeDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.recipesService.remove(id);
    }
}
