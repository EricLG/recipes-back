import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { Public } from '../../../common/decorators/public.decorator'
import { Roles } from '../../../common/decorators/roles.decorator'
import { Food } from '../../../domain/food/schemas/food.schema'
import { UserRole } from '../../../domain/user/enums/user-role.enum'
import { CreateFoodWithMeasuresDto, FoodWithMeasuresDto, UpdateFoodWithMeasuresDto, CreateFoodDto, UpdateFoodDto } from '../dto/food.dto'
import { FoodsService } from '../services/foods.service'

@Controller('foods')
export class FoodsController {

    constructor(private readonly foodsService: FoodsService) {}

    @Roles(UserRole.ADMIN)
    @Post()
    async create(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
        return this.foodsService.create(createFoodDto)
    }

    @Public()
    @Get()
    async findAll(): Promise<Food[]> {
        return this.foodsService.findAll()
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Food> {
        return this.foodsService.findOne(id)
    }

    @Public()
    @Get(':id/with-measures')
    async findWithMeasures(@Param('id') id: string): Promise<FoodWithMeasuresDto> {
        return this.foodsService.findWithMeasures(id)
    }

    @Roles(UserRole.ADMIN)
    @Post('with-measures')
    async createWithMeasures(@Body() dto: CreateFoodWithMeasuresDto): Promise<FoodWithMeasuresDto> {
        return this.foodsService.createWithMeasures(dto)
    }

    @Roles(UserRole.ADMIN)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto): Promise<Food> {
        return this.foodsService.update(id, updateFoodDto)
    }

    @Roles(UserRole.ADMIN)
    @Put(':id/with-measures')
    async updateWithMeasures(@Param('id') id: string, @Body() dto: UpdateFoodWithMeasuresDto): Promise<FoodWithMeasuresDto> {
        return this.foodsService.updateWithMeasures(id, dto)
    }

    @Roles(UserRole.ADMIN)
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.foodsService.remove(id)
    }

}
