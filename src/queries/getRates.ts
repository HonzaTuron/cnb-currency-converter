
const API_URL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'

const NUMBER_VALUES_KEYS = ['amount', 'rate']

function parseRatesTxt(ratesTxt: string) {
    const lines = ratesTxt.split('\n')

    const [_ , headerLine, ...currencyLines] = lines

    const itemsKeys = headerLine.toLowerCase().split('|')

    currencyLines.pop() // remove last empty line

    const currenciesArray = currencyLines.map((line) => {
        const values = line.trim().split('|')

        return values.reduce<Record<string, string | number>>((obj, value, i) => {
            const key = itemsKeys[i]
            const isNumberValue = NUMBER_VALUES_KEYS.includes(key)

            return { ...obj, [key]: isNumberValue ? parseFloat(value) : value }
        }, {})
    })

    return currenciesArray
}

export default async function getRates() {

    const ratesResponse = await fetch(API_URL)

    // TODO: handle errors

    const ratesTxt = await ratesResponse.text()

    return parseRatesTxt(ratesTxt)
}
