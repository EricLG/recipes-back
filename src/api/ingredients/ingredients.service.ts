import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient, IngredientDocument } from './schemas/ingredient.schema';

@Injectable()
export class IngredientsService {
    constructor(
        @InjectModel(Ingredient.name)
        private ingredientModel: Model<IngredientDocument>,
    ) {}

    async create(createDto: CreateIngredientDto) {
        const created = new this.ingredientModel(createDto);
        return created.save();
    }

    async findAll() {
        return this.ingredientModel.find().exec();
    }

    async findOne(id: string) {
        const doc = await this.ingredientModel.findById(id).exec();
        if (!doc) throw new NotFoundException('Ingredient not found');
        return doc;
    }

    async update(id: string, updateDto: UpdateIngredientDto) {
        const updated = await this.ingredientModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
        if (!updated) throw new NotFoundException('Ingredient not found');
        return updated;
    }

    async remove(id: string) {
        const deleted = await this.ingredientModel.findByIdAndDelete(id).exec();
        if (!deleted) throw new NotFoundException('Ingredient not found');
        return deleted;
    }
}
