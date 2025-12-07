import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateIngredientDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    kiloCalories?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    proteins?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    carbohydrates?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    fats?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    fibers?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    totalSugars?: number;
}
