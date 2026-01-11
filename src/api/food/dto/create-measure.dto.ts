import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateMeasureDto {
  @IsString()
  foodId: string;

  @IsString()
  label: string;

  @IsNumber()
  grams: number;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}
