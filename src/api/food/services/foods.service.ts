import { BadRequestException, Injectable, NotFoundException, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { Food, FoodDocument } from '../../../domain/food/schemas/food.schema'
import { Measure, MeasureDocument } from '../../../domain/food/schemas/measure.schema'
import { CreateFoodWithMeasuresDto, FoodWithMeasuresDto, UpdateFoodWithMeasuresDto } from '../dto/food-with-measures.dto'
import { CreateFoodDto, UpdateFoodDto } from '../dto/food.dto'

@Injectable()
export class FoodsService {

    private readonly logger = new Logger(FoodsService.name)

    constructor(
        @InjectModel(Food.name) private foodModel: Model<FoodDocument>,
        @InjectModel(Measure.name) private measureModel: Model<MeasureDocument>,
    ) {}

    async create(createFoodDto: CreateFoodDto): Promise<Food> {
        const createdFood = new this.foodModel(createFoodDto)
        const saved = await createdFood.save()
        const foodIdStr = saved._id?.toString() || ''
        this.logger.log(`✅ Created food - ID: ${foodIdStr}, name: "${saved.name}"`)
        return saved
    }

    async findAll(): Promise<Food[]> {
        return this.foodModel.find().sort({ name: 1 }).exec()
    }

    async findOne(id: string): Promise<Food> {
        const food = await this.foodModel.findById(id).exec()
        if (!food) {
            throw new NotFoundException(`Food with ID ${id} not found`)
        }
        return food
    }

    async update(id: string, updateFoodDto: UpdateFoodDto): Promise<Food> {
        const updatedFood = await this.foodModel.findByIdAndUpdate(id, updateFoodDto, { new: true }).exec()
        if (!updatedFood) {
            throw new NotFoundException(`Food with ID ${id} not found`)
        }
        this.logger.log(`✅ Updated food - ID: ${id}, name: "${updatedFood.name}"`)
        return updatedFood
    }

    async remove(id: string): Promise<void> {
        const result = await this.foodModel.findByIdAndDelete(id).exec()
        if (!result) {
            throw new NotFoundException(`Food with ID ${id} not found`)
        }
        this.logger.log(`✅ Deleted food - ID: ${id}, name: "${result.name}"`)
    }

    async findWithMeasures(id: string): Promise<FoodWithMeasuresDto> {
        const food = await this.foodModel.findById(id).exec()
        if (!food) {
            throw new NotFoundException(`Food with ID ${id} not found`)
        }

        const measures = await this.measureModel.find({ foodId: new Types.ObjectId(id) }).exec()

        return {
            id: food._id.toString(),
            name: food.name,
            referenceUnit: food.referenceUnit,
            density: food.density,
            nutrientsPer100: food.nutrientsPer100,
            needReview: food.needReview,
            category: food.category,
            measures: measures.map(m => ({
                id: m._id.toString(),
                label: m.label,
                grams: m.grams,
                isDefault: m.isDefault,
            })),
        }
    }

    async createWithMeasures(dto: CreateFoodWithMeasuresDto): Promise<FoodWithMeasuresDto> {
        this.logger.debug(`[createWithMeasures] Creating food with ${dto.measures.length} measures - name: "${dto.name}"`)

        // Validate only one default measure
        const defaultCount = dto.measures.filter(m => m.isDefault).length
        if (defaultCount > 1) {
            throw new BadRequestException('Only one measure can have isDefault set to true')
        }

        // Create food
        const createdFood = new this.foodModel({
            name: dto.name,
            referenceUnit: dto.referenceUnit,
            density: dto.density,
            nutrientsPer100: dto.nutrientsPer100,
            needReview: dto.needReview,
            category: dto.category,
        })
        const savedFood = await createdFood.save()
        const savedFoodIdStr = savedFood._id?.toString() || ''
        this.logger.log(`✅ Created food - ID: ${savedFoodIdStr}, name: "${savedFood.name}"`)

        // Create measures
        const createdMeasures = await Promise.all(
            dto.measures.map(async (m) => {
                const measure = new this.measureModel({
                    foodId: new Types.ObjectId(savedFood._id),
                    label: m.label,
                    grams: m.grams,
                    isDefault: m.isDefault ?? false,
                })
                const saved = await measure.save()
                const savedMeasureIdStr = saved._id?.toString() || ''
                this.logger.log(`✅ Created measure - ID: ${savedMeasureIdStr}, foodId: ${savedFoodIdStr}, label: "${m.label}"`)
                return saved
            }),
        )

        return {
            id: savedFood._id.toString(),
            name: savedFood.name,
            referenceUnit: savedFood.referenceUnit,
            density: savedFood.density,
            nutrientsPer100: savedFood.nutrientsPer100,
            needReview: savedFood.needReview,
            category: savedFood.category,
            measures: createdMeasures.map(m => ({
                id: m._id.toString(),
                label: m.label,
                grams: m.grams,
                isDefault: m.isDefault,
            })),
        }
    }

    async updateWithMeasures(id: string, dto: UpdateFoodWithMeasuresDto): Promise<FoodWithMeasuresDto> {
        this.logger.debug(`[updateWithMeasures] Updating food with ID: ${id}`)

        // Check food exists
        const food = await this.foodModel.findById(id).exec()
        if (!food) {
            throw new NotFoundException(`Food with ID ${id} not found`)
        }

        // Update food properties
        if (dto.name !== undefined) food.name = dto.name
        if (dto.referenceUnit !== undefined) food.referenceUnit = dto.referenceUnit
        if (dto.density !== undefined) food.density = dto.density
        if (dto.nutrientsPer100 !== undefined) food.nutrientsPer100 = dto.nutrientsPer100
        if (dto.needReview !== undefined) food.needReview = dto.needReview
        if (dto.category !== undefined) food.category = dto.category

        const savedFood = await food.save()
        this.logger.log(`✅ Updated food - ID: ${id}, name: "${savedFood.name}"`)

        // Handle measures sync (upsert: id present = update, id absent = create, missing = delete)
        if (dto.measures !== undefined) {
            this.logger.debug(`[updateWithMeasures] Syncing ${dto.measures.length} measures for food ID: ${id}`)

            // Clean null ids to undefined
            const cleanMeasures = dto.measures.map(m => ({
                ...m,
                id: m.id || undefined,
            }))

            // Validate only one default
            const defaultCount = cleanMeasures.filter(m => m.isDefault).length
            if (defaultCount > 1) {
                throw new BadRequestException('Only one measure can have isDefault set to true')
            }

            const incomingMeasureIds = new Set(cleanMeasures.filter(m => m.id).map(m => m.id!))
            const existingMeasures = await this.measureModel.find({ foodId: new Types.ObjectId(id) }).exec()

            // Delete measures not in incoming list
            for (const measure of existingMeasures) {
                if (!incomingMeasureIds.has(measure._id.toString())) {
                    const measureIdStr = measure._id?.toString() || ''
                    await this.measureModel.findByIdAndDelete(measure._id).exec()
                    this.logger.log(`✅ Deleted measure - ID: ${measureIdStr}`)
                }
            }

            // Create or update measures
            await Promise.all(
                cleanMeasures.map(async (m) => {
                    if (m.id) {
                        // Update
                        await this.measureModel.findByIdAndUpdate(
                            m.id,
                            {
                                label: m.label,
                                grams: m.grams,
                                isDefault: m.isDefault,
                            },
                            { new: true },
                        ).exec()
                        this.logger.log(`✅ Updated measure - ID: ${m.id}, label: "${m.label}"`)
                    } else {
                        // Create
                        const created = await new this.measureModel({
                            foodId: new Types.ObjectId(id),
                            label: m.label,
                            grams: m.grams,
                            isDefault: m.isDefault ?? false,
                        }).save()
                        const createdIdStr = created._id?.toString() || ''
                        this.logger.log(`✅ Created measure - ID: ${createdIdStr}, foodId: ${id}, label: "${m.label}"`)
                    }
                }),
            )
        }

        this.logger.log(`✅ Complete updateWithMeasures - Food: ${id}`)
        // Return updated data
        return this.findWithMeasures(id)
    }

}
