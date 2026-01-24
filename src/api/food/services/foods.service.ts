import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food, FoodDocument } from '../../../domain/food/schemas/food.schema';
import { CreateFoodDto } from '../dto/create-food.dto';
import { UpdateFoodDto } from '../dto/update-food.dto';

@Injectable()
export class FoodsService {
    constructor(
        @InjectModel(Food.name) private foodModel: Model<FoodDocument>,
    ) {}

    async create(createFoodDto: CreateFoodDto): Promise<Food> {
        const createdFood = new this.foodModel(createFoodDto);
        return createdFood.save();
    }

    async findAll(): Promise<Food[]> {
        return this.foodModel.find().sort({ name: 1 }).exec();
    }

    async findOne(id: string): Promise<Food> {
        const food = await this.foodModel.findById(id).exec();
        if (!food) {
            throw new NotFoundException(`Food with ID ${id} not found`);
        }
        return food;
    }

    async update(id: string, updateFoodDto: UpdateFoodDto): Promise<Food> {
        const updatedFood = await this.foodModel
            .findByIdAndUpdate(id, updateFoodDto, { new: true })
            .exec();
        if (!updatedFood) {
            throw new NotFoundException(`Food with ID ${id} not found`);
        }
        return updatedFood;
    }

    async remove(id: string): Promise<void> {
        const result = await this.foodModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Food with ID ${id} not found`);
        }
    }
}
