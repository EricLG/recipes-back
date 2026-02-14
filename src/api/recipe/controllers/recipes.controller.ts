import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { Recipe } from '../../../domain/recipe/schemas/recipe.schema'
import { RecipeFilterDto } from '../dto/recipe-filter.dto'
import { CreateRecipeWithRelationsDto, UpdateRecipeWithRelationsDto } from '../dto/recipe-with-relations.dto'
import { CreateRecipeDto, DetailedRecipeDto, UpdateRecipeDto } from '../dto/recipe.dto'
import { DetailedRecipeByAggregationDto, RecipeQueryService } from '../services/recipe-query.service'
import { RecipesService } from '../services/recipes.service'

@Controller('recipes')
export class RecipesController {

    constructor(
        private readonly svcRecipes: RecipesService,
        private readonly svcRecipeQuery: RecipeQueryService,
    ) {}

    @Post()
    async create(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return this.svcRecipes.create(createRecipeDto)
    }

    @Post('search')
    async search(@Body() query: RecipeFilterDto): Promise<Recipe[]> {
        return this.svcRecipes.search(query)
    }

    @Get()
    async findAll(): Promise<Recipe[]> {
        return this.svcRecipes.findAll()
    }

    @Get(':id/detail')
    async findDetailedRecipe(@Param('id') id: string): Promise<DetailedRecipeDto> {
        return await this.svcRecipes.findDetailedRecipe(id)
    }

    @Get(':id/aggregation')
    async getDetailedRecipe(@Param('id') id: string): Promise<DetailedRecipeByAggregationDto> {
        return await this.svcRecipeQuery.getDetailedRecipe(id)
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Recipe> {
        return this.svcRecipes.findOne(id)
    }

    @Post('with-relations')
    async createWithRelations(@Body() dto: CreateRecipeWithRelationsDto): Promise<DetailedRecipeDto> {
        return this.svcRecipes.createWithRelations(dto)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
        return this.svcRecipes.update(id, updateRecipeDto)
    }

    @Put(':id/with-relations')
    async updateWithRelations(@Param('id') id: string, @Body() dto: UpdateRecipeWithRelationsDto): Promise<DetailedRecipeDto> {
        return this.svcRecipes.updateWithRelations(id, dto)
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.svcRecipes.remove(id)
    }

}
