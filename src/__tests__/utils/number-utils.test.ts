import { clampToRange } from '../../utils/number-utils'
import { logger } from '../../utils/logger'

jest.mock('../../utils/logger', () => ({
    logger: {
        warn: jest.fn(),
    },
}))

describe('number-utils', () => {
    describe('clampToRange', () => {
        it.each([
            // [value, result, min, max, expected result, test description]
            ['returns max when value is not a number', null, 10, 100, 100],
            ['returns max when value is not a number', 'not-a-number', 10, 100, 100],
            ['returns max when value is greater than max', 150, 10, 100, 100],
            ['returns min when value is less than min', 5, 10, 100, 10],
            ['returns the value when it is within the range', 50, 10, 100, 50],
        ])('%s', (_description, value, min, max, expected) => {
            const result = clampToRange(value, min, max, 'Test Label')
            expect(result).toBe(expected)
        })

        it('logs a warning when min is greater than max', () => {
            expect(clampToRange(50, 100, 10, 'Test Label')).toBe(10)
            expect(logger.warn).toHaveBeenCalledWith('min cannot be greater than max.')
        })
    })
})