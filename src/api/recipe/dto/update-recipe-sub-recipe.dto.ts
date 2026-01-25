import { IsMongoId, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateRecipeSubRecipeDto {
  @IsOptional()
  @IsMongoId()
      parentRecipeId?: string;

  @IsOptional()
  @IsMongoId()
      childRecipeId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
      quantity?: number;
}
