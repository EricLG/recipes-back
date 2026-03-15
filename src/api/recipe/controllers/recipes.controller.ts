import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { Recipe } from '../../../domain/recipe/schemas/recipe.schema'
import { RecipeFilterDto } from '../dto/recipe-filter.dto'
import { CreateRecipeWithRelationsDto, UpdateRecipeWithRelationsDto } from '../dto/recipe-with-relations.dto'
import { DetailedRecipeDto } from '../dto/recipe.dto'
import { RecipesService } from '../services/recipes.service'

@Controller('recipes')
export class RecipesController {

    constructor(
        private readonly svcRecipes: RecipesService,
    ) {}

    @Post('with-relations')
    @UseInterceptors(FileInterceptor('image'))
    async createWithRelations(
        @Body('data') rawData: string,
        @UploadedFile() image?: Express.Multer.File,
    ): Promise<DetailedRecipeDto> {
        const dto: CreateRecipeWithRelationsDto = JSON.parse(rawData)
        const imageUrl = image ? `/api/uploads/recipes/${image.filename}` : ''
        return this.svcRecipes.createWithRelations(dto, imageUrl)
    }

    // TODO : gérer suppression image
    @Put(':id/with-relations')
    @UseInterceptors(FileInterceptor('image'))
    async updateWithRelations(
        @Param('id') id: string,
        @Body('data') data: string,
        @UploadedFile() file?: Express.Multer.File,
    ): Promise<DetailedRecipeDto> {
        const dto: UpdateRecipeWithRelationsDto = JSON.parse(data)
        const imageUrl = file ? `/api/uploads/recipes/${file.filename}` : undefined
        return this.svcRecipes.updateWithRelations(id, dto, imageUrl)
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

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Recipe> {
        return this.svcRecipes.findOne(id)
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.svcRecipes.remove(id)
    }

}
