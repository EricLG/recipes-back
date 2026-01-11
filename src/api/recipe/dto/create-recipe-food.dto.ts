import { IsString, IsNumber } from 'class-validator';

export class CreateRecipeFoodDto {
  @IsString()
  recipeId: string;

  @IsString()
  foodId: string;

  @IsString()
  measureId: string;

  @IsNumber()
  quantity: number;
}
