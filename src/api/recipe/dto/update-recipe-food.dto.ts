import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeFoodDto } from './create-recipe-food.dto';

export class UpdateRecipeFoodDto extends PartialType(CreateRecipeFoodDto) {}
