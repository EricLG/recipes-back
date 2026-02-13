import { PartialType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import { IsString, IsNumber, ValidateNested, IsBoolean, IsEnum } from 'class-validator'

import { FoodCategory } from '../../../domain/food/enums/food-category.enum'

export class NutrientsDto {

    @IsNumber()
    energyKcal: number

    @IsNumber()
    proteins: number

    @IsNumber()
    fats: number

    @IsNumber()
    carbohydrates: number

    @IsNumber()
    sugars: number

    @IsNumber()
    fibers: number

    @IsNumber()
    salt: number

}

export class CreateFoodDto {

    @IsString()
    name: string

    @IsString()
    referenceUnit: string

    @IsNumber()
    density: number

    @ValidateNested()
    @Type(() => NutrientsDto)
    nutrientsPer100: NutrientsDto

    @IsBoolean()
    needReview: boolean

    @IsEnum(FoodCategory)
    category: FoodCategory

}

export class UpdateFoodDto extends PartialType(CreateFoodDto) {}
