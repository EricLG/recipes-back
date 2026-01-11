import { IsString, IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { RecipeSeason } from '../../../domain/recipes/enums/recipe-season.enum';
import { RecipeCategory } from '../../../domain/recipes/enums/recipe-category.enum';

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
