import { Request as ExpressRequest } from 'express'
import { Types } from 'mongoose'

import { WeeklyRecipePlansController } from './weekly-recipe-plans.controller'
import { UserDocument } from '../../../domain/user/schemas/user.schema'
import { WeeklyRecipePlansService } from '../services/weekly-recipe-plans.service'

describe('WeeklyRecipePlansController ownership', () => {

    it('passes the JWT principal to every operation', async () => {
        const userId = new Types.ObjectId()
        const req = { user: { _id: userId } } as ExpressRequest & { user: UserDocument }
        const service = {
            findByWeek: jest.fn(),
            setTarget: jest.fn(),
            candidates: jest.fn(),
            complete: jest.fn(),
            add: jest.fn(),
            remove: jest.fn(),
            replaceRecipe: jest.fn(),
            setRecipeCooked: jest.fn(),
        }
        const controller = new WeeklyRecipePlansController(service as unknown as WeeklyRecipePlansService)
        const week = '2026-10-19'
        const id = new Types.ObjectId().toString()
        await controller.find(req, week)
        await controller.target(req, week, { targetServings: 24 })
        await controller.candidates(req, week)
        await controller.complete(req, week)
        await controller.add(req, week, { recipeId: id })
        await controller.remove(req, week, id)
        await controller.replace(req, week, id, { recipeId: id })
        await controller.cooked(req, week, id, { cooked: true })
        for (const operation of Object.values(service)) {
            expect(operation.mock.calls[0].slice(0, 2)).toEqual([userId.toString(), week])
        }
    })

})
