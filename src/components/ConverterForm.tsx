import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import rates from '../rates/rates.json'
import styled from "styled-components";

const StyledConverterForm = styled.form`
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
`

export default function ConverterForm() {
    const { data } = useQuery({ queryKey: ['rates'], queryFn: () => rates })

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
                value={amount}
                onChange={e => setAmount(e.target.valueAsNumber || 0)}
            />
            <select className="currency-select" value={from} onChange={e => setFrom(e.target.value)}>
                {data?.map(item => (
                    <option key={item.code} value={item.code}>
                        {item.code}
                    </option>
                ))}
            </select>
            {' '}= {result.toFixed(2)} CZK
        </StyledConverterForm>
    )
}
