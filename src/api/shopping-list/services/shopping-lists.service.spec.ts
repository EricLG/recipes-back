import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { Model, Types } from 'mongoose'

import { ShoppingListsService } from './shopping-lists.service'
import { FoodCategory } from '../../../domain/food/enums/food-category.enum'
import { ShoppingListDocument } from '../../../domain/shopping-list/schemas/shopping-list.schema'
import { UserDocument } from '../../../domain/user/schemas/user.schema'
import { ReplaceShoppingListDto } from '../dto/shopping-list.dto'

const ownerId = new Types.ObjectId()
const listId = new Types.ObjectId()

function query(value: unknown) {
    const result = {
        exec: jest.fn().mockResolvedValue(value),
        lean: jest.fn(),
    }
    result.lean.mockReturnValue(result)
    return result
}

function makeDto(overrides: Partial<ReplaceShoppingListDto> = {}): ReplaceShoppingListDto {
    return {
        stores: ['Super U', 'Biocoop'],
        items: [
            {
                itemKey: 'food-id:g',
                kind: 'ingredient',
                foodId: '65a000000000000000000001',
                foodName: 'Farine',
                category: FoodCategory.STARCHES,
                quantity: 500,
                unit: 'g',
                checked: false,
                inStock: false,
                store: 'Super U',
            },
        ],
        ...overrides,
    }
}

function makeService(existingList: Record<string, unknown> | null = null) {
    const listModel = {
        findOne: jest.fn(() => query(existingList)),
        findOneAndUpdate: jest.fn(() => query({ _id: listId })),
    }
    const userModel = { updateOne: jest.fn(() => query({})), findById: jest.fn() }
    const service = new ShoppingListsService(listModel as unknown as Model<ShoppingListDocument>, userModel as unknown as Model<UserDocument>)

    return { service, listModel }
}

describe('ShoppingListsService', () => {

    beforeEach(() => {
        jest.useFakeTimers()
        jest.setSystemTime(new Date('2026-10-19T12:00:00Z'))
    })
    afterEach(() => jest.useRealTimers())

    it('returns 404 for a list not owned by the requesting user', async () => {
        const { service, listModel } = makeService()

        await expect(service.findByWeek(ownerId.toString(), '2026-10-19')).rejects.toBeInstanceOf(NotFoundException)
        expect(listModel.findOne).toHaveBeenCalledWith({ userId: ownerId, weekStart: '2026-10-19' })
    })

    it('reads an embedded snapshot without starting a transaction', async () => {
        const { service } = makeService({
            _id: listId,
            userId: ownerId,
            weekStart: '2026-10-19',
            stores: ['Super U'],
            items: [
                {
                    itemKey: 'food-id:g',
                    kind: 'ingredient',
                    foodId: new Types.ObjectId('65a000000000000000000001'),
                    foodName: 'Farine',
                    category: FoodCategory.STARCHES,
                    quantity: 500,
                    unit: 'g',
                    checked: false,
                    inStock: false,
                    store: 'Super U',
                },
            ],
        })

        const result = await service.findByWeek(ownerId.toString(), '2026-10-19')

        expect(result).toEqual({
            weekStart: '2026-10-19',
            stores: ['Super U'],
            items: [
                {
                    itemKey: 'food-id:g',
                    kind: 'ingredient',
                    foodId: '65a000000000000000000001',
                    foodName: 'Farine',
                    category: FoodCategory.STARCHES,
                    quantity: 500,
                    unit: 'g',
                    checked: false,
                    inStock: false,
                    store: 'Super U',
                },
            ],
        })
        expect(result).not.toHaveProperty('version')
    })

    it('atomically creates or replaces the whole snapshot in one document', async () => {
        const { service, listModel } = makeService()

        const result = await service.replace(ownerId.toString(), '2026-10-19', makeDto({
            items: [{ ...makeDto().items[0], store: undefined }],
        }))

        expect(listModel.findOneAndUpdate).toHaveBeenCalledWith(
            { userId: ownerId, weekStart: '2026-10-19' },
            {
                $set: {
                    stores: ['Super U', 'Biocoop'],
                    items: [expect.objectContaining({ store: 'Super U' })],
                },
                $setOnInsert: { userId: ownerId, weekStart: '2026-10-19' },
            },
            { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
        )
        expect(result.stores).toEqual(['Super U', 'Biocoop'])
        expect(result.items[0].store).toBe('Super U')
    })

    it('does not require transactions when persisting to standalone MongoDB', async () => {
        const { service, listModel } = makeService()

        await service.replace(ownerId.toString(), '2026-10-19', makeDto())

        expect(listModel.findOneAndUpdate).toHaveBeenCalledTimes(1)
        expect(listModel.findOneAndUpdate.mock.calls[0][2]).not.toHaveProperty('session')
    })

    it('maps a concurrent first-write duplicate key to conflict', async () => {
        const { service, listModel } = makeService()
        listModel.findOneAndUpdate.mockImplementation(() => ({
            exec: jest.fn().mockRejectedValue({ code: 11000 }),
        }) as never)

        await expect(service.replace(ownerId.toString(), '2026-10-19', makeDto()))
            .rejects.toBeInstanceOf(ConflictException)
    })

    it('requires a real Monday as weekStart', async () => {
        const { service } = makeService()

        await expect(service.replace(ownerId.toString(), '2026-10-20', makeDto()))
            .rejects.toBeInstanceOf(BadRequestException)
    })

    it('rejects duplicate item keys, other than two stores and duplicate store names', async () => {
        const { service } = makeService()
        const duplicateItems = makeDto()
        duplicateItems.items.push({ ...duplicateItems.items[0] })

        await expect(service.replace(ownerId.toString(), '2026-10-19', duplicateItems))
            .rejects.toBeInstanceOf(BadRequestException)
        await expect(service.replace(ownerId.toString(), '2026-10-19', makeDto({ stores: ['Super U'] })))
            .rejects.toBeInstanceOf(BadRequestException)
        await expect(service.replace(ownerId.toString(), '2026-10-19', makeDto({
            stores: ['Market', ' market ', 'Autre'],
        }))).rejects.toBeInstanceOf(BadRequestException)
    })

    it('validates nested item identifiers, category and positive quantity in the DTO', async () => {
        const input = makeDto()
        const dto = plainToInstance(ReplaceShoppingListDto, {
            ...input,
            items: [
                {
                    ...input.items[0],
                    foodId: 'not-an-id',
                    category: 'unknown-category',
                    quantity: 0,
                },
            ],
        })

        const errors = await validate(dto)
        const itemFields = errors
            .find(error => error.property === 'items')
            ?.children?.flatMap(itemError => itemError.children ?? [])
            .map(itemError => itemError.property)

        expect(itemFields).toEqual(expect.arrayContaining(['foodId', 'category', 'quantity']))
    })

    it('rejects foreign store assignments, invalid quantities and checked items in stock', async () => {
        const { service } = makeService()

        await expect(service.replace(ownerId.toString(), '2026-10-19', makeDto({
            items: [{ ...makeDto().items[0], store: 'Other store' }],
        }))).rejects.toBeInstanceOf(BadRequestException)
        await expect(service.replace(ownerId.toString(), '2026-10-19', makeDto({
            items: [{ ...makeDto().items[0], quantity: Number.POSITIVE_INFINITY }],
        }))).rejects.toBeInstanceOf(BadRequestException)
        await expect(service.replace(ownerId.toString(), '2026-10-19', makeDto({
            items: [{ ...makeDto().items[0], checked: true, inStock: true }],
        }))).rejects.toBeInstanceOf(BadRequestException)
    })

    it('accepts a free text item without food, category, unit or quantity', async () => {
        const { service } = makeService()
        const dto = makeDto({ items: [{ kind: 'free', itemKey: 'free:1', foodName: 'Piles AA x4', checked: false, inStock: false }] })
        expect(await validate(plainToInstance(ReplaceShoppingListDto, dto))).toHaveLength(0)
        const result = await service.replace(ownerId.toString(), '2026-10-19', dto)
        expect(result.items[0]).toEqual({ ...dto.items[0], store: 'Super U' })
        expect(result.items[0]).not.toHaveProperty('foodId')
    })

    it('rejects past writes and dates beyond next week', async () => {
        const { service, listModel } = makeService()
        await expect(service.replace(ownerId.toString(), '2026-10-12', makeDto())).rejects.toMatchObject({ status: 403 })
        await expect(service.replace(ownerId.toString(), '2026-11-02', makeDto())).rejects.toMatchObject({ status: 400 })
        expect(listModel.findOneAndUpdate).not.toHaveBeenCalled()
    })

    it('preserves independent rows for the same food measured in different units', async () => {
        const { service } = makeService()
        const base = makeDto().items[0]
        const dto = makeDto({ items: [
            { ...base, itemKey: `${base.foodId}:unit`, quantity: 2, unit: 'unité', store: 'Super U', checked: true },
            { ...base, itemKey: `${base.foodId}:gram`, quantity: 100, unit: 'g', store: 'Biocoop', inStock: true },
        ] })
        const result = await service.replace(ownerId.toString(), '2026-10-19', dto)
        expect(result.items).toEqual(dto.items)
    })

})
