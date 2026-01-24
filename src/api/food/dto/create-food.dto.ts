import { Type } from 'class-transformer';
import { IsString, IsNumber, ValidateNested, IsBoolean, IsOptional } from 'class-validator';

import { NutrientsDto } from './nutrients.dto';

export class CreateFoodDto {
  @IsString()
      name: string;

  @IsString()
      referenceUnit: string;

  @IsNumber()
      density: number;

  @ValidateNested()
  @Type(() => NutrientsDto)
      nutrientsPer100: NutrientsDto;

  @IsBoolean()
      needReview: boolean;

  @IsString()
  @IsOptional()
      category: string;
}
