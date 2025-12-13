import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class QtyIngredientDto {
    @IsNotEmpty()
    ingredient: string; // ObjectId as string

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    quantity?: number;

    @IsOptional()
    @IsString()
    unit?: string;
}

export class CreateRecipeDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QtyIngredientDto)
    ingredients: QtyIngredientDto[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    subCourses?: string[]; // Array of ObjectIds as strings

    @IsString()
    @IsNotEmpty()
    instructions: string;

    @IsOptional()
    @IsString()
    season?: string;

    @IsBoolean()
    vegetarian: boolean;

    @IsNumber()
    nbParts: number;

    @IsString()
    @IsNotEmpty()
    category: string;
}
