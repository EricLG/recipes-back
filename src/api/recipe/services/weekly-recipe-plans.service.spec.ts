import { BadRequestException, ConflictException, ForbiddenException } from '@nestjs/common'
import { model, Model, Types } from 'mongoose'

import { WeeklyRecipePlansService } from './weekly-recipe-plans.service'
import { RecipeVegetarianStatus } from '../../../domain/recipe/enums/recipe-vegetarian-status.enum'
import { RecipeDocument } from '../../../domain/recipe/schemas/recipe.schema'
import { WeeklyRecipePlanDocument, WeeklyRecipePlanSchema } from '../../../domain/recipe/schemas/weekly-recipe-plan.schema'

const user = new Types.ObjectId().toString()
const week = '2026-10-19'
const recipe = (servings = 4, vegetarianStatus = RecipeVegetarianStatus.NON_VEGETARIAN) => ({ _id: new Types.ObjectId(), name: 'Recipe', servings, vegetarianStatus }) as RecipeDocument
const query = (value: unknown) => ({ exec: jest.fn().mockResolvedValue(value) })

function setup(recipes: RecipeDocument[] = [], items: object[] = [], existing: RecipeDocument[] = []) {
    const plan = { userId: user, weekStart: week, targetServings: 24, items, save: jest.fn() }
    plan.save.mockImplementation(() => Promise.resolve(plan))
    const recipesModel = { find: jest.fn((filter: { _id?: { $in?: unknown[], $nin?: unknown[] } }) => filter._id?.$in ? { ...query(existing), select: jest.fn(() => query(existing)) } : query(recipes)), findOne: jest.fn(() => query(recipes[0] ?? null)) }
    const planModel = { findOne: jest.fn(() => query(plan)), find: jest.fn(() => query([])) }
    const service = new WeeklyRecipePlansService(recipesModel as unknown as Model<RecipeDocument>, planModel as unknown as Model<WeeklyRecipePlanDocument>)
    return { service, plan, recipesModel, planModel }
}

function item(candidate = recipe(), cookedAt: Date | null = null) {
    return { recipeId: candidate._id, recipeName: candidate.name, servings: candidate.servings, source: 'manual', cookedAt }
}

describe('WeeklyRecipePlansService', () => {

    beforeEach(() => {
        jest.useFakeTimers()
        jest.setSystemTime(new Date('2026-10-19T12:00:00Z'))
    })
    afterEach(() => jest.useRealTimers())

    it('creates an empty personal plan on explicit target save', async () => {
        const Plan = model('WeeklyPlanCreationTest', WeeklyRecipePlanSchema)
        const planModel = Object.assign(jest.fn((data: object) => {
            const doc = new Plan(data)
            doc.save = jest.fn().mockResolvedValue(doc)
            return doc
        }), { findOne: jest.fn(() => query(null)) })
        const service = new WeeklyRecipePlansService({} as Model<RecipeDocument>, planModel as unknown as Model<WeeklyRecipePlanDocument>)
        const created = await service.setTarget(user, week, 24)
        expect(created.userId.toString()).toBe(user)
        expect(created.items).toHaveLength(0)
        expect(created.targetServings).toBe(24)
        expect(created.shortage).toBe(24)
    })

    it('fills 24 servings with six distinct four-serving recipes', async () => {
        const { service } = setup(Array.from({ length: 9 }, () => recipe()))
        const plan = await service.complete(user, week)
        expect(plan.totalServings).toBe(24)
        expect(plan.items).toHaveLength(6)
        expect(new Set(plan.items.map(entry => entry.recipeId.toString())).size).toBe(6)
    })

    it('balances six recipes by count rather than grouping flexible recipes with vegetarians', async () => {
        const candidates = [
            ...Array.from({ length: 5 }, () => recipe(4, RecipeVegetarianStatus.VEGETARIAN)),
            ...Array.from({ length: 5 }, () => recipe(4, RecipeVegetarianStatus.FLEXIBLE)),
        ]
        const { service } = setup(candidates)
        const result = await service.complete(user, week)
        const ids = new Set(result.items.map(entry => entry.recipeId.toString()))
        expect(result.items).toHaveLength(6)
        expect(candidates.filter(entry => ids.has(entry._id.toString()) && entry.vegetarianStatus === RecipeVegetarianStatus.VEGETARIAN)).toHaveLength(3)
    })

    it.each(Object.values(RecipeVegetarianStatus))('compensates existing manual choices with status %s', async (status) => {
        const manual = recipe(4, status)
        const vegetarian = recipe(4, RecipeVegetarianStatus.VEGETARIAN)
        const other = recipe(4, RecipeVegetarianStatus.FLEXIBLE)
        const { service, plan, recipesModel } = setup([vegetarian, other], [item(manual)], [manual])
        plan.targetServings = 8
        const result = await service.complete(user, week)
        expect(result.items[0].recipeId).toBe(manual._id)
        expect(result.items[1].recipeId).toBe(status === RecipeVegetarianStatus.VEGETARIAN ? other._id : vegetarian._id)
        expect(recipesModel.find).toHaveBeenCalledWith({ _id: { $in: [manual._id] } })
    })

    it.each([0.1, 0.9])('breaks equal group counts randomly (%s)', async (randomValue) => {
        const vegetarian = recipe(5, RecipeVegetarianStatus.VEGETARIAN)
        const other = recipe(8, RecipeVegetarianStatus.NON_VEGETARIAN)
        const { service, plan } = setup([vegetarian, other])
        plan.targetServings = 1
        const random = jest.spyOn(Math, 'random').mockReturnValue(randomValue)
        try {
            const result = await service.complete(user, week)
            expect(result.items[0].recipeId).toBe(randomValue < 0.5 ? vegetarian._id : other._id)
            expect(result.totalServings).toBe(randomValue < 0.5 ? 5 : 8)
        } finally {
            random.mockRestore()
        }
    })

    it('accepts an odd count and falls back when a group is exhausted', async () => {
        const vegetarian = recipe(4, RecipeVegetarianStatus.VEGETARIAN)
        const { service, plan } = setup([vegetarian, recipe(4), recipe(4)])
        plan.targetServings = 12
        const result = await service.complete(user, week)
        expect(result.items).toHaveLength(3)
        expect(result.items.some(entry => entry.recipeId === vegetarian._id)).toBe(true)
        expect(result.shortage).toBe(0)
    })

    it('does not rebalance a covered plan or look up candidates', async () => {
        const { service, recipesModel } = setup([recipe(4, RecipeVegetarianStatus.VEGETARIAN)], [item(recipe(24))])
        expect((await service.complete(user, week)).items).toHaveLength(1)
        expect(recipesModel.find).not.toHaveBeenCalled()
    })

    it('ignores missing and unknown statuses while retaining their servings and snapshots', async () => {
        const missing = item(recipe(4))
        const unknown = recipe(4)
        delete unknown.vegetarianStatus
        const { service, plan } = setup([recipe(4, RecipeVegetarianStatus.VEGETARIAN), recipe(4)], [missing, item(unknown)], [unknown])
        plan.targetServings = 16
        const result = await service.complete(user, week)
        expect(result.items).toHaveLength(4)
        expect(result.items[0]).toBe(missing)
        expect(result.totalServings).toBe(16)
    })

    it('preserves existing choices and keeps partial results when candidates run out', async () => {
        const previous = item()
        const { service } = setup([recipe(3), recipe(5)], [previous])
        const plan = await service.complete(user, week)
        expect(plan.items[0]).toBe(previous)
        expect(plan.totalServings).toBe(12)
        expect(plan.shortage).toBe(12)
    })

    it('does not add when covered and permits overshooting', async () => {
        const { service, plan } = setup([recipe(7)], [item(recipe(22))])
        const result = await service.complete(user, week)
        expect(result.surplus).toBe(5)
        const before = plan.items.length
        await service.complete(user, week)
        expect(plan.items).toHaveLength(before)
    })

    it('uses shuffled order without optimizing the surplus', async () => {
        const random = jest.spyOn(Math, 'random').mockReturnValue(0.999)
        try {
            const { service, plan } = setup([recipe(7), recipe(4), recipe(4)])
            plan.targetServings = 8
            expect((await service.complete(user, week)).totalServings).toBe(11)
        } finally {
            random.mockRestore()
        }
    })

    it('handles no candidates and updates the target without discarding recipes', async () => {
        const { service } = setup([], [item()])
        expect((await service.complete(user, week)).shortage).toBe(20)
        const plan = await service.setTarget(user, week, 2)
        expect(plan.items).toHaveLength(1)
        expect(plan.surplus).toBe(2)
    })

    it('shares strict eligibility between completion and replacement and scopes history to the user', async () => {
        const current = item()
        const cooked = item(recipe(), new Date())
        const uncooked = item()
        const { service, planModel, recipesModel } = setup()
        planModel.find.mockReturnValue(query([
            { weekStart: week, items: [current] },
            { weekStart: '2026-10-12', items: [cooked, uncooked] },
        ]))
        await service.candidates(user, week)
        expect(planModel.find).toHaveBeenCalledWith({ userId: user, weekStart: { $in: [week, '2026-10-12', '2026-10-05'] } })
        expect(recipesModel.find).toHaveBeenCalledWith({ status: 'approved', category: { $in: ['main', 'others'] }, season: 'autumn', _id: { $nin: [current.recipeId, cooked.recipeId] } })
        expect(recipesModel.find.mock.calls[0][0]._id.$nin).not.toContain(uncooked.recipeId)
    })

    it.each([['2026-03-02', 'spring'], ['2026-06-01', 'summer'], ['2026-09-07', 'autumn'], ['2026-12-28', 'winter']])('uses the target season for %s', async (targetWeek, season) => {
        jest.setSystemTime(new Date(`${targetWeek}T12:00:00Z`))
        const { service, recipesModel } = setup()
        await service.candidates(user, targetWeek)
        expect(recipesModel.find).toHaveBeenCalledWith(expect.objectContaining({ season }))
    })

    it('permits a smaller replacement and rejects ineligible replacements', async () => {
        const previous = item(recipe(24))
        const replacement = recipe(2)
        const { service } = setup([replacement], [previous])
        expect((await service.replaceRecipe(user, week, previous.recipeId.toString(), replacement._id.toString())).shortage).toBe(22)
        await expect(service.replaceRecipe(user, week, replacement._id.toString(), new Types.ObjectId().toString())).rejects.toBeInstanceOf(BadRequestException)
    })

    it('allows approved manual additions outside automatic filters and rejects duplicates', async () => {
        const candidate = recipe()
        const { service, recipesModel } = setup([candidate])
        await service.add(user, week, candidate._id.toString())
        expect(recipesModel.findOne).toHaveBeenCalledWith({ _id: candidate._id.toString(), status: 'approved' })
        await expect(service.add(user, week, candidate._id.toString())).rejects.toBeInstanceOf(ConflictException)
    })

    it('protects cooking history until explicitly unmarked', async () => {
        const cooked = item(recipe(), new Date())
        const { service } = setup([], [cooked])
        await expect(service.remove(user, week, cooked.recipeId.toString())).rejects.toBeInstanceOf(BadRequestException)
        await expect(service.replaceRecipe(user, week, cooked.recipeId.toString(), recipe()._id.toString())).rejects.toBeInstanceOf(BadRequestException)
        await service.setRecipeCooked(user, week, cooked.recipeId.toString(), false)
        expect((await service.remove(user, week, cooked.recipeId.toString())).items).toHaveLength(0)
    })

    it('marks current recipes cooked and blocks next-week cooking and past mutations', async () => {
        const entry = item()
        const { service } = setup([], [entry])
        await service.setRecipeCooked(user, week, entry.recipeId.toString(), true)
        expect(entry.cookedAt).toBeInstanceOf(Date)
        await expect(service.setRecipeCooked(user, '2026-10-26', entry.recipeId.toString(), true)).rejects.toBeInstanceOf(ForbiddenException)
        await expect(service.setTarget(user, '2026-10-12', 24)).rejects.toBeInstanceOf(ForbiddenException)
        await expect(service.complete(user, '2026-10-12')).rejects.toBeInstanceOf(ForbiddenException)
        await expect(service.add(user, '2026-10-12', entry.recipeId.toString())).rejects.toBeInstanceOf(ForbiddenException)
        await expect(service.remove(user, '2026-10-12', entry.recipeId.toString())).rejects.toBeInstanceOf(ForbiddenException)
    })

    it('scopes reads to the owner and reports optimistic concurrency conflicts', async () => {
        const { service, plan, planModel } = setup()
        await service.findByWeek(user, week)
        expect(planModel.findOne).toHaveBeenCalledWith({ userId: user, weekStart: week })
        plan.save.mockRejectedValue({ name: 'VersionError' })
        await expect(service.setTarget(user, week, 24)).rejects.toBeInstanceOf(ConflictException)
    })

})
