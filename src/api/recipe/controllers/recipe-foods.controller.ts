import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { Public } from '../../../common/decorators/public.decorator'
import { Roles } from '../../../common/decorators/roles.decorator'
import { RecipeFood } from '../../../domain/recipe/schemas/recipe-food.schema'
import { UserRole } from '../../../domain/user/enums/user-role.enum'
import { CreateRecipeFoodDto, IPopulatedRecipeFood, UpdateRecipeFoodDto } from '../dto/recipe-food.dto'
import { RecipeFoodsService } from '../services/recipe-foods.service'

@Controller('recipe-foods')
export class RecipeFoodsController {

    constructor(private readonly recipeFoodsService: RecipeFoodsService) {}

    @Roles(UserRole.ADMIN)
    @Post()
    async create(@Body() createRecipeFoodDto: CreateRecipeFoodDto): Promise<RecipeFood> {
        return this.recipeFoodsService.create(createRecipeFoodDto)
    }

    @Public()
    @Get()
    async findAll(): Promise<RecipeFood[]> {
        return this.recipeFoodsService.findAll()
    }

    @Public()
    @Get('recipe/:recipeId')
    async findByRecipeId(@Param('recipeId') recipeId: string): Promise<IPopulatedRecipeFood[]> {
        return this.recipeFoodsService.findByRecipeId(recipeId)
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<RecipeFood> {
        return this.recipeFoodsService.findOne(id)
    }

    @Roles(UserRole.ADMIN)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateRecipeFoodDto: UpdateRecipeFoodDto): Promise<RecipeFood> {
        return this.recipeFoodsService.update(id, updateRecipeFoodDto)
    }

    @Roles(UserRole.ADMIN)
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.recipeFoodsService.remove(id)
    }

}
