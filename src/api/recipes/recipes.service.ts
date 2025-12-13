import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe, RecipeDocument } from './schemas/recipe.schema';

@Injectable()
export class RecipesService {
    constructor(
        @InjectModel(Recipe.name)
        private recipeModel: Model<RecipeDocument>,
    ) {}

    async create(createDto: CreateRecipeDto) {
        const created = new this.recipeModel(createDto);
        return created.save();
    }

    async findAll() {
        return this.recipeModel.find().populate('ingredients.ingredient').exec();
    }

    async findOne(id: string) {
        const doc = await this.recipeModel.findById(id)
            .populate('ingredients.ingredient')
            .populate('subCourses')
            .exec();
        if (!doc) throw new NotFoundException('Recipe not found');
        return doc;
    }

    async update(id: string, updateDto: UpdateRecipeDto) {
        const updated = await this.recipeModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .populate('ingredients.ingredient')
            .populate('subCourses')
            .exec();
        if (!updated) throw new NotFoundException('Recipe not found');
        return updated;
    }

    async remove(id: string) {
        const deleted = await this.recipeModel.findByIdAndDelete(id).exec();
        if (!deleted) throw new NotFoundException('Recipe not found');
        return deleted;
    }
}
