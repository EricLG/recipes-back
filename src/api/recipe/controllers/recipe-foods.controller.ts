import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { IPopulatedRecipeFood } from '../dto/recipe-food-response.dto'
import { RecipeFood } from './../../../domain/recipe/schemas/recipe-food.schema'
import { CreateRecipeFoodDto } from './../dto/create-recipe-food.dto'
import { UpdateRecipeFoodDto } from './../dto/update-recipe-food.dto'
import { RecipeFoodsService } from './../services/recipe-foods.service'

@Controller('recipe-foods')
export class RecipeFoodsController {

    constructor(private readonly recipeFoodsService: RecipeFoodsService) {}

    @Post()
    async create(@Body() createRecipeFoodDto: CreateRecipeFoodDto): Promise<RecipeFood> {
        return this.recipeFoodsService.create(createRecipeFoodDto)
    }

    @Get()
    async findAll(): Promise<RecipeFood[]> {
        return this.recipeFoodsService.findAll()
    }

    @Get('recipe/:recipeId')
    async findByRecipeId(@Param('recipeId') recipeId: string): Promise<IPopulatedRecipeFood[]> {
        return this.recipeFoodsService.findByRecipeId(recipeId)
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<RecipeFood> {
        return this.recipeFoodsService.findOne(id)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateRecipeFoodDto: UpdateRecipeFoodDto): Promise<RecipeFood> {
        return this.recipeFoodsService.update(id, updateRecipeFoodDto)
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.recipeFoodsService.remove(id)
    }

}
