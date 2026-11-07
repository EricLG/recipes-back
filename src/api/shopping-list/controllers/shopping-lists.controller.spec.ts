import { Request as ExpressRequest } from 'express'
import { Types } from 'mongoose'

import { ShoppingListsController } from './shopping-lists.controller'
import { UserDocument } from '../../../domain/user/schemas/user.schema'
import { ShoppingListsService } from '../services/shopping-lists.service'

describe('ShoppingListsController', () => {

    it('takes the owner id from the authenticated request principal', async () => {
        const userId = new Types.ObjectId()
        const service = {
            findByWeek: jest.fn().mockResolvedValue({ weekStart: '2026-10-19', stores: [], items: [] }),
        }
        const controller = new ShoppingListsController(service as unknown as ShoppingListsService)
        const request = { user: { _id: userId } } as ExpressRequest & { user: UserDocument }

        await controller.findByWeek(request, '2026-10-19')

        expect(service.findByWeek).toHaveBeenCalledWith(userId.toString(), '2026-10-19')
    })

})
