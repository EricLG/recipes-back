import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { Public } from '../../../common/decorators/public.decorator'
import { Roles } from '../../../common/decorators/roles.decorator'
import { Measure } from '../../../domain/food/schemas/measure.schema'
import { UserRole } from '../../../domain/user/enums/user-role.enum'
import { CreateMeasureDto, UpdateMeasureDto } from '../dto/measure.dto'
import { MeasuresService } from '../services/measures.service'

@Controller('measures')
export class MeasuresController {

    constructor(private readonly measuresService: MeasuresService) {}

    @Roles(UserRole.ADMIN)
    @Post()
    async create(@Body() createMeasureDto: CreateMeasureDto): Promise<Measure> {
        return this.measuresService.create(createMeasureDto)
    }

    @Public()
    @Get()
    async findAll(): Promise<Measure[]> {
        return this.measuresService.findAll()
    }

    @Public()
    @Get('foods/:foodId')
    async findAllByFoodId(@Param('foodId') foodId: string): Promise<Measure[]> {
        return this.measuresService.findAllByFoodId(foodId)
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Measure> {
        return this.measuresService.findOne(id)
    }

    @Roles(UserRole.ADMIN)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateMeasureDto: UpdateMeasureDto): Promise<Measure> {
        return this.measuresService.update(id, updateMeasureDto)
    }

    @Roles(UserRole.ADMIN)
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.measuresService.remove(id)
    }

}
