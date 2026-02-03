/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { IFood, IMeasure, IPopulatedRecipeFood } from '../dto/recipe-food-response.dto';
import { RecipeFood, RecipeFoodDocument } from './../../../domain/recipe/schemas/recipe-food.schema';
import { CreateRecipeFoodDto } from './../dto/create-recipe-food.dto';
import { UpdateRecipeFoodDto } from './../dto/update-recipe-food.dto';

@Injectable()
export class RecipeFoodsService {
    private readonly logger = new Logger(RecipeFoodsService.name);

    constructor(
        @InjectModel(RecipeFood.name) private recipeFoodModel: Model<RecipeFoodDocument>,
    ) {}

    async create(createRecipeFoodDto: CreateRecipeFoodDto): Promise<RecipeFood> {
        // Convert string IDs to ObjectId
        const dtoWithObjectIds = {
            ...createRecipeFoodDto,
            recipeId: new Types.ObjectId(createRecipeFoodDto.recipeId),
            foodId: new Types.ObjectId(createRecipeFoodDto.foodId),
            measureId: new Types.ObjectId(createRecipeFoodDto.measureId),
        };

        const createdRecipeFood = new this.recipeFoodModel(dtoWithObjectIds);
        const saved = await createdRecipeFood.save();
        this.logger.log(`✅ Created recipe food - ID: ${saved.id}, recipeId: ${createRecipeFoodDto.recipeId}, foodId: ${createRecipeFoodDto.foodId}, quantity: ${createRecipeFoodDto.quantity}`);
        return saved;
    }

    async findAll(): Promise<RecipeFood[]> {
        return this.recipeFoodModel.find().exec();
    }

    async findOne(id: string): Promise<RecipeFood> {
        const recipeFood = await this.recipeFoodModel.findById(id)
            .populate('recipeId')
            .populate('foodId')
            .populate('measureId')
            .exec();
        if (!recipeFood) {
            throw new NotFoundException(`RecipeFood with ID ${id} not found`);
        }
        return recipeFood;
    }

    async update(id: string, updateRecipeFoodDto: UpdateRecipeFoodDto): Promise<RecipeFood> {
        // Convert string IDs to ObjectId if present
        const updateData: any = { ...updateRecipeFoodDto };
        if (updateRecipeFoodDto.recipeId) {
            updateData.recipeId = new Types.ObjectId(updateRecipeFoodDto.recipeId);
        }
        if (updateRecipeFoodDto.foodId) {
            updateData.foodId = new Types.ObjectId(updateRecipeFoodDto.foodId);
        }
        if (updateRecipeFoodDto.measureId) {
            updateData.measureId = new Types.ObjectId(updateRecipeFoodDto.measureId);
        }

        const updatedRecipeFood = await this.recipeFoodModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .exec();
        if (!updatedRecipeFood) {
            throw new NotFoundException(`RecipeFood with ID ${id} not found`);
        }
        this.logger.log(`✅ Updated recipe food - ID: ${id}`);
        return updatedRecipeFood;
    }

    async remove(id: string): Promise<void> {
        const result = await this.recipeFoodModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`RecipeFood with ID ${id} not found`);
        }
        this.logger.log(`✅ Deleted recipe food - ID: ${id}`);
    }

    async findByRecipeId(recipeId: string): Promise<IPopulatedRecipeFood[]> {
        const items = await this.recipeFoodModel.find({ recipeId: new Types.ObjectId(recipeId) })
            .populate<{ foodId: IFood }>('foodId')
            .populate<{ measureId: IMeasure }>('measureId')
            .exec();

        return items as IPopulatedRecipeFood[];
    }
}
