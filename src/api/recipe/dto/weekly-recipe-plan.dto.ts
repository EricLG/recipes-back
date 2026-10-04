import { IsBoolean, IsInt, IsMongoId, Min } from 'class-validator'

export class SetWeeklyTargetDto {

    @IsInt()
    @Min(1)
    targetServings: number

}

export class ReplaceWeeklyRecipeDto {

    @IsMongoId()
    recipeId: string

}

export class SetRecipeCookedDto {

    @IsBoolean()
    cooked: boolean

}
