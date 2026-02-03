import { IsMongoId, IsNumber, Min } from 'class-validator';

export class UpdateRecipeSubRecipeDto {
  @IsMongoId()
      parentRecipeId?: string;

  @IsMongoId()
      childRecipeId?: string;

  @IsNumber()
  @Min(0)
      quantity?: number;
}
