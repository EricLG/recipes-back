import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { Food } from '../../../domain/food/schemas/food.schema'
import { CreateFoodWithMeasuresDto, FoodWithMeasuresDto, UpdateFoodWithMeasuresDto, CreateFoodDto, UpdateFoodDto } from '../dto/food.dto'
import { FoodsService } from '../services/foods.service'

@Controller('foods')
export class FoodsController {

    constructor(private readonly foodsService: FoodsService) {}

    @Post()
    async create(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
        return this.foodsService.create(createFoodDto)
    }

    @Get()
    async findAll(): Promise<Food[]> {
        return this.foodsService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Food> {
        return this.foodsService.findOne(id)
    }

    @Get(':id/with-measures')
    async findWithMeasures(@Param('id') id: string): Promise<FoodWithMeasuresDto> {
        return this.foodsService.findWithMeasures(id)
    }

    @Post('with-measures')
    async createWithMeasures(@Body() dto: CreateFoodWithMeasuresDto): Promise<FoodWithMeasuresDto> {
        return this.foodsService.createWithMeasures(dto)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto): Promise<Food> {
        return this.foodsService.update(id, updateFoodDto)
    }

    @Put(':id/with-measures')
    async updateWithMeasures(@Param('id') id: string, @Body() dto: UpdateFoodWithMeasuresDto): Promise<FoodWithMeasuresDto> {
        return this.foodsService.updateWithMeasures(id, dto)
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.foodsService.remove(id)
    }

}
