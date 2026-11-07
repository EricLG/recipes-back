import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { assertEditableWeek, shiftWeek, validateWeek } from '../../../common/utils/week.util'
import { RecipeCategory } from '../../../domain/recipe/enums/recipe-category.enum'
import { RecipeSeason } from '../../../domain/recipe/enums/recipe-season.enum'
import { RecipeStatus } from '../../../domain/recipe/enums/recipe-status.enum'
import { RecipeVegetarianStatus } from '../../../domain/recipe/enums/recipe-vegetarian-status.enum'
import { WeeklyPlanRecipeSource } from '../../../domain/recipe/enums/weekly-plan-recipe-source.enum'
import { Recipe, RecipeDocument } from '../../../domain/recipe/schemas/recipe.schema'
import { WeeklyRecipePlan, WeeklyRecipePlanDocument } from '../../../domain/recipe/schemas/weekly-recipe-plan.schema'

@Injectable()
export class WeeklyRecipePlansService {

    constructor(
        @InjectModel(Recipe.name) private readonly recipeModel: Model<RecipeDocument>,
        @InjectModel(WeeklyRecipePlan.name) private readonly planModel: Model<WeeklyRecipePlanDocument>,
    ) {}

    async findByWeek(userId: string, weekStart: string): Promise<WeeklyRecipePlanDocument> {
        validateWeek(weekStart)
        const plan = await this.planModel.findOne({ userId, weekStart }).exec()
        if (!plan) throw new NotFoundException('Planning inexistant pour cette semaine')
        return plan
    }

    private async editablePlan(userId: string, weekStart: string): Promise<WeeklyRecipePlanDocument> {
        assertEditableWeek(weekStart)
        return await this.planModel.findOne({ userId, weekStart }).exec()
          ?? new this.planModel({ userId, weekStart })
    }

    private async save(plan: WeeklyRecipePlanDocument): Promise<WeeklyRecipePlanDocument> {
        plan.totalServings = plan.items.reduce((sum, item) => sum + item.servings, 0)
        plan.shortage = Math.max(0, plan.targetServings - plan.totalServings)
        plan.surplus = Math.max(0, plan.totalServings - plan.targetServings)
        try {
            return await plan.save()
        } catch (error) {
            if (error?.code === 11000 || error?.name === 'VersionError') {
                throw new ConflictException('Le planning a changé. Rechargez-le avant de réessayer.')
            }
            throw error
        }
    }

    async setTarget(userId: string, week: string, target: number): Promise<WeeklyRecipePlanDocument> {
        const plan = await this.editablePlan(userId, week)
        plan.targetServings = target
        return this.save(plan)
    }

    async candidates(userId: string, week: string): Promise<RecipeDocument[]> {
        assertEditableWeek(week)
        const plans = await this.planModel.find({ userId, weekStart: { $in: [week, shiftWeek(week, -1), shiftWeek(week, -2)] } }).exec()
        const excluded = plans.flatMap(plan => plan.items.filter(item => plan.weekStart === week || item.cookedAt != null).map(item => item.recipeId))
        const month = new Date(`${week}T00:00:00Z`).getUTCMonth() + 1
        const season = month >= 3 && month <= 5
            ? RecipeSeason.SPRING
            : month >= 6 && month <= 8
                ? RecipeSeason.SUMMER
                : month >= 9 && month <= 11 ? RecipeSeason.AUTUMN : RecipeSeason.WINTER
        return this.recipeModel.find({ status: RecipeStatus.APPROVED, category: { $in: [RecipeCategory.MAIN, RecipeCategory.OTHERS] }, season, _id: { $nin: excluded } }).exec()
    }

    async complete(userId: string, week: string): Promise<WeeklyRecipePlanDocument> {
        const plan = await this.editablePlan(userId, week)
        let total = plan.items.reduce((sum, item) => sum + item.servings, 0)
        if (total >= plan.targetServings) return this.save(plan)
        const existing = plan.items.length
            ? await this.recipeModel.find({ _id: { $in: plan.items.map(item => item.recipeId) } }).select('vegetarianStatus').exec()
            : []
        let vegetarianCount = existing.filter(recipe => recipe.vegetarianStatus === RecipeVegetarianStatus.VEGETARIAN).length
        let otherCount = existing.filter(recipe => recipe.vegetarianStatus === RecipeVegetarianStatus.NON_VEGETARIAN || recipe.vegetarianStatus === RecipeVegetarianStatus.FLEXIBLE).length
        const candidates = await this.candidates(userId, week)
        for (let i = candidates.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const candidate = candidates[i]
            candidates[i] = candidates[j]
            candidates[j] = candidate
        }
        const vegetarian = candidates.filter(recipe => recipe.vegetarianStatus === RecipeVegetarianStatus.VEGETARIAN)
        const others = candidates.filter(recipe => recipe.vegetarianStatus !== RecipeVegetarianStatus.VEGETARIAN)
        while (total < plan.targetServings && (vegetarian.length || others.length)) {
            const preferVegetarian = vegetarianCount < otherCount || (vegetarianCount === otherCount && Math.random() < 0.5)
            const preferred = preferVegetarian ? vegetarian : others
            const fallback = preferVegetarian ? others : vegetarian
            const recipe = (preferred.length ? preferred : fallback).shift()!
            plan.items.push(this.snapshot(recipe, WeeklyPlanRecipeSource.GENERATED))
            total += recipe.servings
            if (recipe.vegetarianStatus === RecipeVegetarianStatus.VEGETARIAN) vegetarianCount++
            else if (recipe.vegetarianStatus === RecipeVegetarianStatus.NON_VEGETARIAN || recipe.vegetarianStatus === RecipeVegetarianStatus.FLEXIBLE) otherCount++
        }
        return this.save(plan)
    }

    private snapshot(recipe: RecipeDocument, source: WeeklyPlanRecipeSource) {
        return { recipeId: recipe._id, recipeName: recipe.name, servings: recipe.servings, source, cookedAt: null }
    }

    async add(userId: string, week: string, recipeId: string): Promise<WeeklyRecipePlanDocument> {
        const plan = await this.editablePlan(userId, week)
        if (plan.items.some(item => item.recipeId.toString() === recipeId)) throw new ConflictException('Cette recette est déjà dans le planning')
        const recipe = await this.recipeModel.findOne({ _id: recipeId, status: RecipeStatus.APPROVED }).exec()
        if (!recipe) throw new NotFoundException('Recette approuvée introuvable')
        plan.items.push(this.snapshot(recipe, WeeklyPlanRecipeSource.MANUAL))
        return this.save(plan)
    }

    async remove(userId: string, week: string, recipeId: string): Promise<WeeklyRecipePlanDocument> {
        assertEditableWeek(week)
        const plan = await this.findByWeek(userId, week)
        const item = this.item(plan, recipeId)
        if (item.cookedAt) throw new BadRequestException('Décochez Cuisinée avant de supprimer ou remplacer cette recette')
        plan.items = plan.items.filter(entry => entry !== item)
        return this.save(plan)
    }

    async replaceRecipe(userId: string, week: string, previousId: string, recipeId: string): Promise<WeeklyRecipePlanDocument> {
        assertEditableWeek(week)
        const plan = await this.findByWeek(userId, week)
        const item = this.item(plan, previousId)
        if (item.cookedAt) throw new BadRequestException('Décochez Cuisinée avant de remplacer cette recette')
        const recipe = (await this.candidates(userId, week)).find(candidate => candidate._id.toString() === recipeId)
        if (!recipe) throw new BadRequestException('Cette recette ne respecte pas les critères de remplacement')
        plan.items[plan.items.indexOf(item)] = this.snapshot(recipe, WeeklyPlanRecipeSource.MANUAL_REPLACEMENT)
        return this.save(plan)
    }

    async setRecipeCooked(userId: string, week: string, recipeId: string, cooked: boolean): Promise<WeeklyRecipePlanDocument> {
        assertEditableWeek(week, true)
        const plan = await this.findByWeek(userId, week)
        const item = this.item(plan, recipeId)
        item.cookedAt = cooked ? item.cookedAt ?? new Date() : null
        return this.save(plan)
    }

    private item(plan: WeeklyRecipePlanDocument, recipeId: string) {
        const item = plan.items.find(entry => entry.recipeId.toString() === recipeId)
        if (!item) throw new NotFoundException('Recette absente du planning')
        return item
    }

}
