import { ResponseRecipeFoodDto } from './../dto/response-recipe-food.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipeFoodsService } from '../services/recipe-foods.service';
import { CreateRecipeFoodDto } from '../dto/create-recipe-food.dto';
import { UpdateRecipeFoodDto } from '../dto/update-recipe-food.dto';
import { RecipeFood } from '../../../domain/recipes/schemas/recipe-food.schema';

@Controller('recipe-foods')
export class RecipeFoodsController {
    constructor(private readonly recipeFoodsService: RecipeFoodsService) {}

    @Post()
    async create(@Body() createRecipeFoodDto: CreateRecipeFoodDto): Promise<RecipeFood> {
        return this.recipeFoodsService.create(createRecipeFoodDto);
    }

    @Get()
    async findAll(): Promise<RecipeFood[]> {
        return this.recipeFoodsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<RecipeFood> {
        return this.recipeFoodsService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateRecipeFoodDto: UpdateRecipeFoodDto): Promise<RecipeFood> {
        return this.recipeFoodsService.update(id, updateRecipeFoodDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.recipeFoodsService.remove(id);
    }

    @Get('by-recipe/:recipeId')
    async findByRecipeId(@Param('recipeId') recipeId: string): Promise<RecipeFood[]> {
        return this.recipeFoodsService.findByRecipeId(recipeId);
    }
}
