import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { RecipeSubRecipe } from '../../../domain/recipe/schemas/recipe-sub-recipe.schema';
import { CreateRecipeSubRecipeDto } from '../dto/create-recipe-sub-recipe.dto';
import { UpdateRecipeSubRecipeDto } from '../dto/update-recipe-sub-recipe.dto';
import { RecipeSubRecipesService } from '../services/recipe-sub-recipes.service';

@Controller('recipe-sub-recipes')
export class RecipeSubRecipesController {
    constructor(private readonly service: RecipeSubRecipesService) {}

  @Post()
    async create(@Body() createDto: CreateRecipeSubRecipeDto): Promise<RecipeSubRecipe> {
        return this.service.create(createDto);
    }

  @Get()
  async findAll(): Promise<RecipeSubRecipe[]> {
      return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RecipeSubRecipe> {
      return this.service.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateRecipeSubRecipeDto): Promise<RecipeSubRecipe> {
      return this.service.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
      return this.service.remove(id);
  }
}
