import { IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
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
}
