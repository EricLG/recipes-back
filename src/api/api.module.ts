import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { FoodModule } from './food/food.module'
import { RecipeModule } from './recipe/recipe.module'
import { UserModule } from './user/user.module'

@Module({
    imports: [AuthModule, FoodModule, RecipeModule, UserModule],
})
export class ApiModule {}
