import { assertEditableWeek, currentWeek, shiftWeek, validateWeek } from './week.util'

describe('Paris week calendar', () => {

    afterEach(() => jest.useRealTimers())
    it('uses the Paris date across Sunday UTC midnight and DST', () => {
        expect(currentWeek(new Date('2026-10-25T23:30:00Z'))).toBe('2026-10-26')
        expect(currentWeek(new Date('2026-03-29T22:30:00Z'))).toBe('2026-03-30')
        expect(shiftWeek('2026-12-28', 1)).toBe('2027-01-04')
    })
    it('rejects invalid Mondays and future weeks and locks past writes', () => {
        jest.useFakeTimers().setSystemTime(new Date('2026-10-19T12:00:00Z'))
        for (const value of ['2026-02-30', '2026-10-20', '2026-11-02', '2026-10-19T00:00:00Z']) expect(() => validateWeek(value)).toThrow()
        expect(() => validateWeek('2026-10-12')).not.toThrow()
        expect(() => assertEditableWeek('2026-10-12')).toThrow()
        expect(() => assertEditableWeek('2026-10-26')).not.toThrow()
        expect(() => assertEditableWeek('2026-10-26', true)).toThrow()
    })

})
