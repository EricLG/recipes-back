import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ShoppingListsController } from './controllers/shopping-lists.controller'
import { ShoppingListsService } from './services/shopping-lists.service'
import { ShoppingList, ShoppingListSchema } from '../../domain/shopping-list/schemas/shopping-list.schema'
import { User, UserSchema } from '../../domain/user/schemas/user.schema'

@Module({
    imports: [MongooseModule.forFeature([{ name: ShoppingList.name, schema: ShoppingListSchema }, { name: User.name, schema: UserSchema }])],
    controllers: [ShoppingListsController],
    providers: [ShoppingListsService],
})
export class ShoppingListModule {}
