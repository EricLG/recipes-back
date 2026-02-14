import { IsArray, IsBoolean, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator'

import { RecipeCategory } from '../../../domain/recipe/enums/recipe-category.enum'
import { RecipeSeason } from '../../../domain/recipe/enums/recipe-season.enum'

export class RecipeFilterDto {

    @IsOptional()
    @IsString()
    @MaxLength(40)
    name?: string

    @IsOptional()
    @IsEnum(RecipeCategory)
    category?: RecipeCategory

    @IsOptional()
    @IsArray()
    @IsEnum(RecipeSeason, { each: true })
    seasons?: RecipeSeason[]

    @IsOptional()
    @IsBoolean()
    vegetarian?: boolean

}
