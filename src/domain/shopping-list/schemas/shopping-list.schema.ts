import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { FoodCategory } from '../../food/enums/food-category.enum'

@Schema({ _id: false })
export class ShoppingListItem {

    @Prop({ required: true, minlength: 1, maxlength: 256 })
    itemKey: string

    @Prop({ required: true, enum: ['ingredient', 'free'] })
    kind: 'ingredient' | 'free'

    @Prop({ type: Types.ObjectId, ref: 'Food' })
    foodId?: Types.ObjectId

    @Prop({ required: true, minlength: 1, maxlength: 200 })
    foodName: string

    @Prop({ type: String, enum: FoodCategory })
    category?: FoodCategory

    @Prop({ min: Number.MIN_VALUE })
    quantity?: number

    @Prop({ minlength: 1, maxlength: 64 })
    unit?: string

    @Prop({ required: true, default: false })
    checked: boolean

    @Prop({ required: true, default: false })
    inStock: boolean

    @Prop({ required: true, minlength: 1, maxlength: 100 })
    store: string

}

export const ShoppingListItemSchema = SchemaFactory.createForClass(ShoppingListItem)

@Schema({ collection: 'shopping_lists', timestamps: true })
export class ShoppingList {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId

    @Prop({ required: true, match: /^\d{4}-\d{2}-\d{2}$/ })
    weekStart: string

    @Prop({ type: [String], required: true, default: [] })
    stores: string[]

    @Prop({ type: [ShoppingListItemSchema], required: true, default: [] })
    items: ShoppingListItem[]

}

export type ShoppingListDocument = ShoppingList & Document
export const ShoppingListSchema = SchemaFactory.createForClass(ShoppingList)
ShoppingListSchema.index({ userId: 1, weekStart: 1 }, { unique: true, name: 'user_week_unique' })
ShoppingListSchema.path('items').validate((items: ShoppingListItem[]) => {
    const itemKeys = items.map(item => item.itemKey)
    return new Set(itemKeys).size === itemKeys.length
}, 'Shopping list item keys must be unique')
