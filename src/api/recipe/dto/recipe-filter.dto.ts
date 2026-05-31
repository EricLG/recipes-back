import { IsArray, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator'

import { RecipeCategory } from '../../../domain/recipe/enums/recipe-category.enum'
import { RecipePreparationTime } from '../../../domain/recipe/enums/recipe-preparation-time.enum'
import { RecipeSeason } from '../../../domain/recipe/enums/recipe-season.enum'
import { RecipeVegetarianStatus } from './../../../domain/recipe/enums/recipe-vegetarian-status.enum'

export class RecipeFilterDto {

    @IsOptional()
    @IsString()
    @MaxLength(40)
    text?: string

    @IsOptional()
    @IsEnum(RecipeCategory)
    category?: RecipeCategory

    @IsOptional()
    @IsArray()
    @IsEnum(RecipeSeason, { each: true })
    seasons?: RecipeSeason[]

    @IsOptional()
    @IsArray()
    @IsEnum(RecipeVegetarianStatus, { each: true })
    vegetarianStatus?: RecipeVegetarianStatus[]

    @IsOptional()
    @IsEnum(RecipePreparationTime)
    preparationTime?: RecipePreparationTime

}
