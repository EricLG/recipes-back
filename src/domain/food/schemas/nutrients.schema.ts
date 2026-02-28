import { Prop } from '@nestjs/mongoose'

export class Nutrients {

    @Prop({ required: true })
    energyKcal: number

    @Prop({ required: true })
    proteins: number

    @Prop({ required: true })
    fats: number

    @Prop({ required: true })
    carbohydrates: number

    @Prop({ required: true })
    sugars: number

    @Prop({ required: true })
    fibers: number

    @Prop({ required: true })
    salt: number

    @Prop({ required: true })
    saturatedFattyAcids: number

}
