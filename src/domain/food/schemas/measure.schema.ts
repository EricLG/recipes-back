import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'measures', timestamps: true })
export class Measure {
    @Prop({ type: Types.ObjectId, ref: 'Food', required: true })
        foodId: Types.ObjectId;

    @Prop({ required: true })
        label: string;

    @Prop({ required: true })
        grams: number;

    @Prop({ default: false })
        isDefault: boolean;
}

export type MeasureDocument = Measure & Document;
export const MeasureSchema = SchemaFactory.createForClass(Measure);

MeasureSchema.set('toJSON', { virtuals: true });
