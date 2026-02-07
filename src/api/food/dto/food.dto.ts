import { PartialType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import { IsString, IsNumber, ValidateNested, IsBoolean } from 'class-validator'

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

    @IsString()
    category: string

}

export class UpdateFoodDto extends PartialType(CreateFoodDto) {}
