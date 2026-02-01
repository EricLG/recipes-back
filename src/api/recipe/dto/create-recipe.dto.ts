import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

import { RecipeCategory } from './../../../domain/recipe/enums/recipe-category.enum';
import { RecipeSeason } from './../../../domain/recipe/enums/recipe-season.enum';

export class CreateRecipeDto {
  @IsString()
      name: string;

  @IsString()
      instructions: string;

  @IsBoolean()
      vegetarian: boolean;

  @IsEnum(RecipeSeason)
      season: RecipeSeason;

  @IsEnum(RecipeCategory)
      category: RecipeCategory;

  @IsNumber()
      servings: number;
}
