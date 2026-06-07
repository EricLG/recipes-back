import { Type } from 'class-transformer'
import { Allow, IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

import { RecipeCategory } from '../../../domain/recipe/enums/recipe-category.enum'
import { RecipeSeason } from '../../../domain/recipe/enums/recipe-season.enum'
import { RecipeStatus } from '../../../domain/recipe/enums/recipe-status.enum'
import { RecipeVegetarianStatus } from './../../../domain/recipe/enums/recipe-vegetarian-status.enum'

/**
 * Represents a recipe food item in create/update operations
 *
 * **For UPDATE operations (Option C - Strict):**
 * - If `id` is provided: Item will be UPDATED with new foodId/measureId/quantity
 * - If `id` is null/undefined: Item will be CREATED as a new recipe food
 * - Items NOT in the payload will be DELETED
 *
 * **Frontend responsibility:** When updating a recipe with existing recipe foods,
 * you MUST include the `id` field for all existing items you want to keep or modify.
 * Omitting `id` for existing items will delete and recreate them.
 */
export class RecipeFoodItemDto {

    @Allow()
    id?: string | null

    @IsString()
    foodId: string

    @IsString()
    measureId: string

    @IsNumber()
    quantity: number

}

/**
 * Represents a recipe sub-recipe item in create/update operations
 *
 * **For UPDATE operations (Option C - Strict):**
 * - If `id` is provided: Item will be UPDATED with new childRecipeId/quantity
 * - If `id` is null/undefined: Item will be CREATED as a new sub-recipe reference
 * - Items NOT in the payload will be DELETED
 *
 * **Frontend responsibility:** When updating a recipe with existing sub-recipes,
 * you MUST include the `id` field for all existing items you want to keep or modify.
 */
export class RecipeSubRecipeItemDto {

    @Allow()
    id?: string | null

    @IsString()
    childRecipeId: string

    @IsNumber()
    quantity: number

}

export class CreateRecipeWithRelationsDto {

    @IsString()
    name: string

    @IsString()
    instructions: string

    @IsEnum(RecipeStatus)
    status: RecipeStatus

    @IsEnum(RecipeVegetarianStatus)
    vegetarianStatus: RecipeVegetarianStatus

    @IsArray()
    @IsEnum(RecipeSeason, { each: true })
    season: RecipeSeason[]

    @IsEnum(RecipeCategory)
    category: RecipeCategory

    @IsNumber()
    servings: number

    @IsNumber()
    @IsOptional()
    preparationTime?: number

    @IsString()
    @IsOptional()
    kitchenTools?: string

    @IsString()
    @IsOptional()
    remark?: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RecipeFoodItemDto)
    recipeFoods: RecipeFoodItemDto[]

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RecipeSubRecipeItemDto)
    recipeSubRecipes: RecipeSubRecipeItemDto[]

}

export class UpdateRecipeWithRelationsDto {

    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    instructions?: string

    @IsEnum(RecipeStatus)
    @IsOptional()
    status?: RecipeStatus

    @IsEnum(RecipeVegetarianStatus)
    @IsOptional()
    vegetarianStatus?: RecipeVegetarianStatus

    @IsArray()
    @IsEnum(RecipeSeason, { each: true })
    @IsOptional()
    season?: RecipeSeason[]

    @IsEnum(RecipeCategory)
    @IsOptional()
    category?: RecipeCategory

    @IsNumber()
    @IsOptional()
    servings?: number

    @IsNumber()
    @IsOptional()
    preparationTime?: number

    @IsString()
    @IsOptional()
    kitchenTools?: string

    @IsString()
    @IsOptional()
    remark?: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RecipeFoodItemDto)
    @IsOptional()
    recipeFoods?: RecipeFoodItemDto[]

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RecipeSubRecipeItemDto)
    @IsOptional()
    recipeSubRecipes?: RecipeSubRecipeItemDto[]

}
