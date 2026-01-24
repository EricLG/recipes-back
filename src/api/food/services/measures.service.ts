import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Measure, MeasureDocument } from './../../../domain/food/schemas/measure.schema';
import { CreateMeasureDto } from './../dto/create-measure.dto';
import { UpdateMeasureDto } from './../dto/update-measure.dto';

@Injectable()
export class MeasuresService {
    constructor(
        @InjectModel(Measure.name) private measureModel: Model<MeasureDocument>,
    ) {}

    async create(createMeasureDto: CreateMeasureDto): Promise<Measure> {
        const createdMeasure = new this.measureModel(createMeasureDto);
        return createdMeasure.save();
    }

    async findAll(): Promise<Measure[]> {
        return this.measureModel.find().exec();
    }

    async findOne(id: string): Promise<Measure> {
        const measure = await this.measureModel.findById(id).exec();
        if (!measure) {
            throw new NotFoundException(`Measure with ID ${id} not found`);
        }
        return measure;
    }

    async update(id: string, updateMeasureDto: UpdateMeasureDto): Promise<Measure> {
        const updatedMeasure = await this.measureModel
            .findByIdAndUpdate(id, updateMeasureDto, { new: true })
            .exec();
        if (!updatedMeasure) {
            throw new NotFoundException(`Measure with ID ${id} not found`);
        }
        return updatedMeasure;
    }

    async remove(id: string): Promise<void> {
        const result = await this.measureModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Measure with ID ${id} not found`);
        }
    }

    async findAllByFoodId(foodId: string): Promise<Measure[]> {
        return this.measureModel.find({ foodId }).exec();
    }
}
