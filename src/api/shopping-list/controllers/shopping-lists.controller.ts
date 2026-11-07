import { Body, Controller, Get, Param, Put, Request } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'

import { UserDocument } from '../../../domain/user/schemas/user.schema'
import { ReplaceShoppingListDto, ShoppingListResponse } from '../dto/shopping-list.dto'
import { ShoppingListsService } from '../services/shopping-lists.service'

@Controller('shopping-lists')
export class ShoppingListsController {

    constructor(private readonly shoppingListsService: ShoppingListsService) {}

    @Get('preferences/stores')
    preferences(@Request() req: ExpressRequest & { user: UserDocument }) {
        return this.shoppingListsService.preferences(req.user._id.toString())
    }

    @Get(':weekStart')
    async findByWeek(
        @Request() req: ExpressRequest & { user: UserDocument },
        @Param('weekStart') weekStart: string,
    ): Promise<ShoppingListResponse> {
        return this.shoppingListsService.findByWeek(req.user._id.toString(), weekStart)
    }

    @Put(':weekStart')
    async replace(
        @Request() req: ExpressRequest & { user: UserDocument },
        @Param('weekStart') weekStart: string,
        @Body() dto: ReplaceShoppingListDto,
    ): Promise<ShoppingListResponse> {
        return this.shoppingListsService.replace(req.user._id.toString(), weekStart, dto)
    }

}
