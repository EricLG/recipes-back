import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ collection: 'migrations' })
export class Migration {

    @Prop({ required: true, unique: true })
    name: string

    @Prop({ required: true })
    appliedAt: Date

}

export type MigrationDocument = Migration & Document
export const MigrationSchema = SchemaFactory.createForClass(Migration)
