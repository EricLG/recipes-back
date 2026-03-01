import { PartialType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import { IsString, IsNumber, ValidateNested, IsBoolean, IsEnum, IsArray, IsOptional, Allow } from 'class-validator'

import { FoodCategory } from '../../../domain/food/enums/food-category.enum'

class NutrientsDto {

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

    @IsNumber()
    saturatedFattyAcids: number

}

class MeasureItemDto {

    @Allow()
    id?: string | null

    @IsString()
    label: string

    @IsNumber()
    grams: number

    @IsBoolean()
    isDefault: boolean

}

export class CreateFoodDto {

    @IsString()
    name: string

    @ValidateNested()
    @Type(() => NutrientsDto)
    nutrientsPer100: NutrientsDto

    @IsBoolean()
    needReview: boolean

    @IsEnum(FoodCategory)
    category: FoodCategory

    @IsString()
    source: string

}

export class CreateFoodWithMeasuresDto extends CreateFoodDto {

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MeasureItemDto)
    measures: MeasureItemDto[]

}

export class UpdateFoodDto extends PartialType(CreateFoodDto) {}

export class UpdateFoodWithMeasuresDto extends UpdateFoodDto {

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MeasureItemDto)
    @IsOptional()
    measures?: MeasureItemDto[]

}

export class FoodWithMeasuresDto {

    id: string
    name: string
    nutrientsPer100: NutrientsDto
    needReview: boolean
    category: FoodCategory
    source: string
    @Type(() => MeasureItemDto)
    measures: MeasureItemDto[]

}
