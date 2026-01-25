import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { RecipeCategory } from './../../../domain/recipe/enums/recipe-category.enum';
import { RecipeSeason } from './../../../domain/recipe/enums/recipe-season.enum';

export class CreateRecipeDto {
  @IsString()
      name: string;

  @IsString()
      instructions: string;

  @IsBoolean()
  @IsOptional()
      vegetarian?: boolean;

  @IsEnum(RecipeSeason)
  @IsOptional()
      season?: RecipeSeason;

  @IsEnum(RecipeCategory)
      category: RecipeCategory;

  @IsNumber()
      servings: number;
}
