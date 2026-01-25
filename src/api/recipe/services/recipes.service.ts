import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DetailedRecipeDto } from '../dto/response-recipe-food.dto';
import { LeanRecipe, LeanRecipeFood, LeanSubRecipe, RecipeMapper } from './../../../domain/recipe/mappers/recipe.mapper';
import { Recipe, RecipeDocument } from './../../../domain/recipe/schemas/recipe.schema';
import { CreateRecipeDto } from './../dto/create-recipe.dto';
import { UpdateRecipeDto } from './../dto/update-recipe.dto';
import { RecipeFoodsService } from './recipe-foods.service';
import { RecipeSubRecipesService } from './recipe-sub-recipes.service';

@Injectable()
export class RecipesService {
    constructor(
        @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
        private readonly svcRecipeFoods: RecipeFoodsService,
        private readonly svcRecipeSubRecipes: RecipeSubRecipesService,
        private readonly mapper: RecipeMapper
    ) {}

    async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        const createdRecipe = new this.recipeModel(createRecipeDto);
        return createdRecipe.save();
    }

    async findAll(): Promise<Recipe[]> {
        return this.recipeModel.find().exec();
    }

    async findOne(id: string): Promise<Recipe> {
        const recipe = await this.recipeModel.findById(id).exec();
        if (!recipe) {
            throw new NotFoundException(`Recipe with ID ${id} not found`);
        }
        return recipe;
    }

    async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
        const updatedRecipe = await this.recipeModel
            .findByIdAndUpdate(id, updateRecipeDto, { new: true })
            .exec();
        if (!updatedRecipe) {
            throw new NotFoundException(`Recipe with ID ${id} not found`);
        }
        return updatedRecipe;
    }

    async remove(id: string): Promise<void> {
        const result = await this.recipeModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Recipe with ID ${id} not found`);
        }
    }

    async findDetailedRecipe(id: string): Promise<DetailedRecipeDto> {
        const recipe = await this.recipeModel.findById(id).lean() as LeanRecipe;

        if (!recipe) {
            throw new NotFoundException();
        }

        const recipeFoods: LeanRecipeFood[] = await this.svcRecipeFoods.findByRecipeId(id) as LeanRecipeFood[];
        const subRecipes: LeanSubRecipe[] = await this.svcRecipeSubRecipes.findByParentRecipeId(id) as LeanSubRecipe[];

        return this.mapper.toDetailedRecipeDto(recipe, recipeFoods, subRecipes);
    }

}
