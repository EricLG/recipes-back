import { Model } from 'mongoose'

import { MigrationDocument } from './migration.schema'
import { MigrationService } from './migration.service'
import { ShoppingListSchema } from '../../domain/shopping-list/schemas/shopping-list.schema'

describe('Shopping-list migrations', () => {

    it('declares a unique index for owner and week', () => {
        expect(ShoppingListSchema.indexes()).toEqual(expect.arrayContaining([[{ userId: 1, weekStart: 1 }, expect.objectContaining({ unique: true, name: 'user_week_unique' })]]))
    })

    it('creates the owner/week index and records the migration', async () => {
        const collection = { createIndex: jest.fn().mockResolvedValue('user_week_unique') }
        const connection = { collection: jest.fn(() => collection) }
        const migrationModel = {
            findOne: jest.fn(() => ({ lean: () => ({ exec: jest.fn().mockResolvedValue(null) }) })),
            create: jest.fn().mockResolvedValue({}),
        }
        const service = new MigrationService(
            migrationModel as unknown as Model<MigrationDocument>,
            connection as never,
        )

        await service.runMigrateShoppingListIndexes()

        expect(connection.collection).toHaveBeenCalledWith('shopping_lists')
        expect(collection.createIndex).toHaveBeenCalledWith(
            { userId: 1, weekStart: 1 },
            { unique: true, name: 'user_week_unique' },
        )
        expect(migrationModel.create).toHaveBeenCalledWith({
            name: 'create-shopping-list-unique-indexes',
            appliedAt: expect.any(Date),
        })
    })

})
