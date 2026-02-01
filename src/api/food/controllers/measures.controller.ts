import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Measure } from './../../../domain/food/schemas/measure.schema';
import { CreateMeasureDto } from './../dto/create-measure.dto';
import { UpdateMeasureDto } from './../dto/update-measure.dto';
import { MeasuresService } from './../services/measures.service';

@Controller('measures')
export class MeasuresController {
    constructor(private readonly measuresService: MeasuresService) {}

    @Post()
    async create(@Body() createMeasureDto: CreateMeasureDto): Promise<Measure> {
        return this.measuresService.create(createMeasureDto);
    }

    @Get()
    async findAll(): Promise<Measure[]> {
        return this.measuresService.findAll();
    }

    @Get('foods/:foodId')
    async findAllByFoodId(@Param('foodId') foodId: string): Promise<Measure[]> {
        return this.measuresService.findAllByFoodId(foodId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Measure> {
        return this.measuresService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateMeasureDto: UpdateMeasureDto): Promise<Measure> {
        return this.measuresService.update(id, updateMeasureDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.measuresService.remove(id);
    }
}
