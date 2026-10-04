import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { assertEditableWeek, validateWeek } from '../../../common/utils/week.util'
import { FoodCategory } from '../../../domain/food/enums/food-category.enum'
import { ShoppingList, ShoppingListDocument } from '../../../domain/shopping-list/schemas/shopping-list.schema'
import { User, UserDocument } from '../../../domain/user/schemas/user.schema'
import { ReplaceShoppingListDto, ShoppingListItemDto, ShoppingListResponse } from '../dto/shopping-list.dto'

@Injectable()
export class ShoppingListsService {

    constructor(
        @InjectModel(ShoppingList.name) private readonly listModel: Model<ShoppingListDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async findByWeek(userId: string, weekStart: string): Promise<ShoppingListResponse> {
        validateWeek(weekStart)
        const list = await this.listModel.findOne({ userId: new Types.ObjectId(userId), weekStart })
            .lean<ShoppingList & { _id: Types.ObjectId }>()
            .exec()
        if (!list) {
            throw new NotFoundException('Shopping list not found')
        }
        if (list.items.some(item => !list.stores.includes(item.store))) {
            throw new InternalServerErrorException('Shopping list contains an item assigned to a missing store')
        }

        return {
            weekStart: list.weekStart,
            stores: list.stores,
            items: list.items.map(item => ({
                itemKey: item.itemKey,
                kind: item.kind,
                foodId: item.foodId?.toString(),
                foodName: item.foodName,
                category: item.category,
                quantity: item.quantity,
                unit: item.unit,
                checked: item.checked,
                inStock: item.inStock,
                store: item.store,
            })),
        }
    }

    async replace(userId: string, weekStart: string, dto: ReplaceShoppingListDto): Promise<ShoppingListResponse> {
        assertEditableWeek(weekStart)
        const stores = this.validateStores(dto.stores)
        const items = this.validateItems(dto.items, stores)
        const ownerId = new Types.ObjectId(userId)

        try {
            await this.listModel.findOneAndUpdate(
                { userId: ownerId, weekStart },
                {
                    $set: { stores, items },
                    $setOnInsert: { userId: ownerId, weekStart },
                },
                { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
            ).exec()
        } catch (error) {
            if (this.isDuplicateKeyError(error)) {
                throw new ConflictException('A concurrent shopping-list creation conflicted with a unique constraint')
            }
            throw error
        }

        await this.userModel.updateOne({ _id: ownerId }, { $set: { shoppingStores: stores } }).exec()
        return { weekStart, stores, items }
    }

    async preferences(userId: string): Promise<{ stores: string[] }> {
        const user = await this.userModel.findById(userId).select({ shoppingStores: 1 }).lean().exec()
        return { stores: user?.shoppingStores ?? ['Super U', 'Biocoop'] }
    }

    private validateStores(stores: string[]): string[] {
        if (!Array.isArray(stores) || stores.length !== 2) {
            throw new BadRequestException('stores must contain exactly 2 store names')
        }
        const normalizedStores = stores.map(store => store?.trim())
        const normalizedNames = normalizedStores.map(store => store?.toLowerCase())
        if (normalizedStores.some(store => !store || store.length > 100)) {
            throw new BadRequestException('Store names must contain between 1 and 100 characters')
        }
        if (new Set(normalizedNames).size !== normalizedNames.length) {
            throw new BadRequestException('Store names must be distinct')
        }
        return normalizedStores
    }

    private validateItems(
        items: ReplaceShoppingListDto['items'],
        stores: string[],
    ): Array<Omit<ShoppingListItemDto, 'store'> & { store: string }> {
        if (!Array.isArray(items) || items.length > 1000) {
            throw new BadRequestException('items must contain no more than 1000 items')
        }
        const keys = new Set<string>()
        return items.map((item) => {
            if (!item.itemKey?.trim() || keys.has(item.itemKey)) {
                throw new BadRequestException('Item keys must be non-empty and unique')
            }
            keys.add(item.itemKey)
            if (!['ingredient', 'free'].includes(item.kind) || !item.foodName?.trim()) {
                throw new BadRequestException('Item kind and label are required')
            }
            if (item.kind === 'ingredient' && (!Types.ObjectId.isValid(item.foodId ?? '') || !item.unit?.trim())) {
                throw new BadRequestException('Food names and units must not be empty')
            }
            if (item.kind === 'ingredient' && (!Number.isFinite(item.quantity) || (item.quantity ?? 0) <= 0)) {
                throw new BadRequestException('Item quantities must be finite and positive')
            }
            if (item.kind === 'ingredient' && !Object.values(FoodCategory).includes(item.category!)) {
                throw new BadRequestException('Item category is not supported')
            }
            if (item.checked && item.inStock) {
                throw new BadRequestException('An item cannot be checked and in stock at the same time')
            }
            const store = item.store?.trim() || stores[0]
            if (!stores.includes(store)) {
                throw new BadRequestException(`Store ${store} does not belong to this shopping list`)
            }
            return {
                itemKey: item.itemKey,
                kind: item.kind,
                ...(item.kind === 'ingredient' ? { foodId: item.foodId, category: item.category, quantity: item.quantity, unit: item.unit } : {}),
                foodName: item.foodName,
                checked: item.checked,
                inStock: item.inStock,
                store,
            }
        })
    }

    private isDuplicateKeyError(error: unknown): boolean {
        return typeof error === 'object' && error !== null && 'code' in error && error.code === 11000
    }

}
