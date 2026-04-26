import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { Public } from '../../../common/decorators/public.decorator'
import { Roles } from '../../../common/decorators/roles.decorator'
import { RecipeSubRecipe } from '../../../domain/recipe/schemas/recipe-sub-recipe.schema'
import { UserRole } from '../../../domain/user/enums/user-role.enum'
import { CreateRecipeSubRecipeDto, UpdateRecipeSubRecipeDto } from '../dto/recipe-sub-recipe.dto'
import { RecipeSubRecipesService } from '../services/recipe-sub-recipes.service'

@Controller('recipe-sub-recipes')
export class RecipeSubRecipesController {

    constructor(private readonly service: RecipeSubRecipesService) {}

    @Roles(UserRole.ADMIN)
    @Post()
    async create(@Body() createDto: CreateRecipeSubRecipeDto): Promise<RecipeSubRecipe> {
        return this.service.create(createDto)
    }

    @Public()
    @Get()
    async findAll(): Promise<RecipeSubRecipe[]> {
        return this.service.findAll()
    }

    @Public()
    @Get('parent/:parentRecipeId')
    async findByParentRecipeId(@Param('parentRecipeId') parentRecipeId: string): Promise<RecipeSubRecipe[]> {
        return await this.service.findAllByParentRecipeId(parentRecipeId)
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<RecipeSubRecipe> {
        return this.service.findOne(id)
    }

    @Roles(UserRole.ADMIN)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDto: UpdateRecipeSubRecipeDto): Promise<RecipeSubRecipe> {
        return this.service.update(id, updateDto)
    }

    @Roles(UserRole.ADMIN)
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.service.remove(id)
    }

}
