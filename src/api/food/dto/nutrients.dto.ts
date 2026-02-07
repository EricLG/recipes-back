import { IsNumber } from 'class-validator'

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
