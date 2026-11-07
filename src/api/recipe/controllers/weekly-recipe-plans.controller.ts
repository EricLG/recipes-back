import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'

import { MongoIdPipe } from '../../../common/utils/mongo-id.pipe'
import { UserDocument } from '../../../domain/user/schemas/user.schema'
import { ReplaceWeeklyRecipeDto, SetRecipeCookedDto, SetWeeklyTargetDto } from '../dto/weekly-recipe-plan.dto'
import { WeeklyRecipePlansService } from '../services/weekly-recipe-plans.service'

type AuthRequest = ExpressRequest & { user: UserDocument }

@Controller('weekly-recipe-plans')
export class WeeklyRecipePlansController {

    constructor(private readonly service: WeeklyRecipePlansService) {}

    @Get(':weekStart')
    find(@Request() req: AuthRequest, @Param('weekStart') week: string) {
        return this.service.findByWeek(req.user._id.toString(), week)
    }

    @Put(':weekStart')
    target(@Request() req: AuthRequest, @Param('weekStart') week: string, @Body() dto: SetWeeklyTargetDto) {
        return this.service.setTarget(req.user._id.toString(), week, dto.targetServings)
    }

    @Get(':weekStart/candidates')
    candidates(@Request() req: AuthRequest, @Param('weekStart') week: string) {
        return this.service.candidates(req.user._id.toString(), week)
    }

    @Post(':weekStart/complete')
    complete(@Request() req: AuthRequest, @Param('weekStart') week: string) {
        return this.service.complete(req.user._id.toString(), week)
    }

    @Post(':weekStart/recipes')
    add(@Request() req: AuthRequest, @Param('weekStart') week: string, @Body() dto: ReplaceWeeklyRecipeDto) {
        return this.service.add(req.user._id.toString(), week, dto.recipeId)
    }

    @Delete(':weekStart/recipes/:recipeId')
    remove(@Request() req: AuthRequest, @Param('weekStart') week: string, @Param('recipeId', MongoIdPipe) id: string) {
        return this.service.remove(req.user._id.toString(), week, id)
    }

    @Put(':weekStart/recipes/:recipeId/replace')
    replace(@Request() req: AuthRequest, @Param('weekStart') week: string, @Param('recipeId', MongoIdPipe) id: string, @Body() dto: ReplaceWeeklyRecipeDto) {
        return this.service.replaceRecipe(req.user._id.toString(), week, id, dto.recipeId)
    }

    @Put(':weekStart/recipes/:recipeId/cooked')
    cooked(@Request() req: AuthRequest, @Param('weekStart') week: string, @Param('recipeId', MongoIdPipe) id: string, @Body() dto: SetRecipeCookedDto) {
        return this.service.setRecipeCooked(req.user._id.toString(), week, id, dto.cooked)
    }

}
