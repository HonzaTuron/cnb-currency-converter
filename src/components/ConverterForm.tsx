import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import styled from "styled-components";
import { loadRates } from "../queries/loadRates.ts";

const INPUT_MAX_VALUE = 9_999_999

const StyledConverterForm = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    margin: 8px 0;
    background: #f5f5f5;
    border: 1px solid #2196f3;
    border-radius: 8px;
    font-family: Arial, sans-serif;
    font-size: 16px;

    .amount-input {
        width: 33%;
        padding: 4px 8px;
        border: 1px solid #bdbdbd;
        border-radius: 4px;
        background: white;
        font-size: 16px;
    }

    .currency-select {
        padding: 4px 8px;
        border: 1px solid #bdbdbd;
        border-radius: 4px;
        background: white;
        font-size: 16px;
    }
    
    .result {
        font-weight: bold;
        white-space: nowrap;
    }
`

export default function ConverterForm() {
    const { data } = useQuery({ queryKey: ['rates'], queryFn: loadRates })

    const [amount, setAmount] = useState(1)
    const [from, setFrom] = useState('USD')

    const result = useMemo(() => {
        if (!data) return 0
        const fromRate = data.find(item => item.code === from)
        if (!fromRate) return 0
        return amount * (fromRate.rate / fromRate.amount)
    }, [amount, from, data])

    return (
        <StyledConverterForm>
            <input
                className="amount-input"
                type="number"
                value={amount || ''}
                onChange={e => {
                    const numberValue = e.target.valueAsNumber

                    setAmount(prevState => (numberValue < INPUT_MAX_VALUE || isNaN(numberValue)) ? numberValue : prevState)
                }}
            />
            <select className="currency-select" value={from} onChange={e => setFrom(e.target.value)}>
                {data?.map(item => (
                    <option key={item.code} value={item.code}>
                        {item.code}
                    </option>
                ))}
            </select>
            <div className="result">{' '}= {result.toFixed(2)} CZK</div>
        </StyledConverterForm>
    )
}
