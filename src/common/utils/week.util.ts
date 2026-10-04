import { BadRequestException, ForbiddenException } from '@nestjs/common'

export function shiftWeek(week: string, offset: number): string {
    const date = new Date(`${week}T00:00:00Z`)
    date.setUTCDate(date.getUTCDate() + offset * 7)
    return date.toISOString().slice(0, 10)
}

export function currentWeek(now = new Date()): string {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now)
    const part = (type: string) => parts.find(value => value.type === type)!.value
    const date = new Date(`${part('year')}-${part('month')}-${part('day')}T00:00:00Z`)
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 6) % 7)
    return date.toISOString().slice(0, 10)
}

export function validateWeek(week: string): void {
    const date = new Date(`${week}T00:00:00Z`)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(week) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== week || date.getUTCDay() !== 1) {
        throw new BadRequestException('weekStart must be a Monday in YYYY-MM-DD format')
    }
    if (week > shiftWeek(currentWeek(), 1)) throw new BadRequestException('Only weeks up to next week are accessible')
}

export function assertEditableWeek(week: string, cooked = false): void {
    validateWeek(week)
    if (week < currentWeek() || (cooked && week !== currentWeek())) {
        throw new ForbiddenException('This week is read-only for this operation')
    }
}
