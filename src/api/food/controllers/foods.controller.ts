import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { FoodsService } from '../services/foods.service';
import { CreateFoodDto } from '../dto/create-food.dto';
import { UpdateFoodDto } from '../dto/update-food.dto';
import { Food } from '../../../domain/food/schemas/food.schema';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Post()
  async create(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
    return this.foodsService.create(createFoodDto);
  }

  @Get()
  async findAll(): Promise<Food[]> {
    return this.foodsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Food> {
    return this.foodsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto): Promise<Food> {
    return this.foodsService.update(id, updateFoodDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.foodsService.remove(id);
  }
}
