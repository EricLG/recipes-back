import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Food, FoodSchema } from './../../domain/food/schemas/food.schema'
import { Measure, MeasureSchema } from './../../domain/food/schemas/measure.schema'
import { FoodsController } from './controllers/foods.controller'
import { MeasuresController } from './controllers/measures.controller'
import { FoodsService } from './services/foods.service'
import { MeasuresService } from './services/measures.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Food.name, schema: FoodSchema },
            { name: Measure.name, schema: MeasureSchema },
        ]),
    ],
    controllers: [FoodsController, MeasuresController],
    providers: [FoodsService, MeasuresService],
    exports: [FoodsService, MeasuresService],
})
export class FoodModule {}
