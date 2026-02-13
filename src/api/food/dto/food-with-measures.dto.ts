import { Type } from 'class-transformer'
import { Allow, IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

import { FoodCategory } from './../../../domain/food/enums/food-category.enum'
import { NutrientsDto } from './food.dto'

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

export class CreateFoodWithMeasuresDto {

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

    @IsString()
    category: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MeasureItemDto)
    measures: MeasureItemDto[]

}

export class UpdateFoodWithMeasuresDto {

    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    referenceUnit?: string

    @IsNumber()
    @IsOptional()
    density?: number

    @ValidateNested()
    @Type(() => NutrientsDto)
    @IsOptional()
    nutrientsPer100?: NutrientsDto

    @IsBoolean()
    @IsOptional()
    needReview?: boolean

    @IsEnum(FoodCategory)
    @IsOptional()
    category: FoodCategory

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MeasureItemDto)
    @IsOptional()
    measures?: MeasureItemDto[]

}

export class FoodWithMeasuresDto {

    id: string
    name: string
    referenceUnit: string
    density: number
    nutrientsPer100: NutrientsDto
    needReview: boolean
    category: FoodCategory
    @Type(() => MeasureItemDto)
    measures: MeasureItemDto[]

}
