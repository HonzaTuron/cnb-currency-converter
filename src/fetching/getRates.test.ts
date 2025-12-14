import { describe, it, expect } from 'vitest'
import { parseRatesTxt } from './getRates'

describe('parseRatesTxt', () => {
    it('should parse valid rates text into array of currency objects', () => {
        const sampleTxt = `14 Dec 2025 #205
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.123
USA|dollar|1|USD|23.456
`

        const result = parseRatesTxt(sampleTxt)

        expect(result).toEqual([
            {
                country: 'Australia',
                currency: 'dollar',
                amount: 1,
                code: 'AUD',
                rate: 15.123
            },
            {
                country: 'USA',
                currency: 'dollar',
                amount: 1,
                code: 'USD',
                rate: 23.456
            }
        ])
    })

    it('should handle empty currency lines', () => {
        const sampleTxt = `14 Dec 2025 #205
country|currency|amount|code|rate
`

        const result = parseRatesTxt(sampleTxt)

        expect(result).toEqual([])
    })

    it('should parse numbers correctly for amount and rate', () => {
        const sampleTxt = `14 Dec 2025 #205
country|currency|amount|code|rate
Czech Republic|koruna|1|CZK|1.000
`

        const result = parseRatesTxt(sampleTxt)

        expect(result[0].amount).toBe(1)
        expect(result[0].rate).toBe(1.000)
        expect(typeof result[0].amount).toBe('number')
        expect(typeof result[0].rate).toBe('number')
        expect(typeof result[0].country).toBe('string')
    })
})
