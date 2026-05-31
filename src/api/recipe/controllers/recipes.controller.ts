import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ThrottlerGuard, Throttle } from '@nestjs/throttler'

import { Public } from '../../../common/decorators/public.decorator'
import { Roles } from '../../../common/decorators/roles.decorator'
import { Recipe } from '../../../domain/recipe/schemas/recipe.schema'
import { UserRole } from '../../../domain/user/enums/user-role.enum'
import { RecipeFilterDto } from '../dto/recipe-filter.dto'
import { CreateRecipeWithRelationsDto, UpdateRecipeWithRelationsDto } from '../dto/recipe-with-relations.dto'
import { DetailedRecipeDto } from '../dto/recipe.dto'
import { RecipesService } from '../services/recipes.service'

@Controller('recipes')
@UseGuards(ThrottlerGuard)
export class RecipesController {

    constructor(
        private readonly svcRecipes: RecipesService,
    ) {}

    @Roles(UserRole.ADMIN)
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
    @Roles(UserRole.ADMIN)
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

    @Public()
    @Post('search')
    @Throttle({ medium: { limit: 60, ttl: 60000 } }) // 30 requests per minute
    async search(@Body() query: RecipeFilterDto): Promise<Recipe[]> {
        return this.svcRecipes.search(query)
    }

    @Public()
    @Get()
    async findAll(): Promise<Recipe[]> {
        return this.svcRecipes.findAll()
    }

    @Public()
    @Get(':id/detail')
    async findDetailedRecipe(@Param('id') id: string): Promise<DetailedRecipeDto> {
        return await this.svcRecipes.findDetailedRecipe(id)
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Recipe> {
        return this.svcRecipes.findOne(id)
    }

    @Roles(UserRole.ADMIN)
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.svcRecipes.remove(id)
    }

}
