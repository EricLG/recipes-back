import { Type } from 'class-transformer'
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsBoolean,
    IsEnum,
    IsMongoId,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    Min,
    ValidateNested,
    ValidateIf,
    IsIn,
} from 'class-validator'

import { FoodCategory } from '../../../domain/food/enums/food-category.enum'

export class ShoppingListItemDto {

    @IsString()
    @Length(1, 256)
    itemKey: string

    @IsIn(['ingredient', 'free'])
    kind: 'ingredient' | 'free'

    @ValidateIf(item => item.kind === 'ingredient')
    @IsMongoId()
    foodId?: string

    @IsString()
    @Length(1, 200)
    foodName: string

    @ValidateIf(item => item.kind === 'ingredient')
    @IsEnum(FoodCategory)
    category?: FoodCategory

    @ValidateIf(item => item.kind === 'ingredient')
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Min(Number.MIN_VALUE)
    quantity?: number

    @ValidateIf(item => item.kind === 'ingredient')
    @IsString()
    @Length(1, 64)
    unit?: string

    @IsBoolean()
    checked: boolean

    @IsBoolean()
    inStock: boolean

    @IsOptional()
    @IsString()
    @Length(1, 100)
    store?: string | null

}

export class ReplaceShoppingListDto {

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsString({ each: true })
    @Length(1, 100, { each: true })
    stores: string[]

    @IsArray()
    @ArrayMaxSize(1000)
    @Type(() => ShoppingListItemDto)
    @ValidateNested({ each: true })
    items: ShoppingListItemDto[]

}

export interface ShoppingListResponse {
    weekStart: string
    stores: string[]
    items: ShoppingListItemDto[]
}
