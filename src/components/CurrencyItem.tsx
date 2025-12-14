import styled from "styled-components";

const CurrencyItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    margin: 8px 0;
    background: #e3f2fd;
    border: 1px solid #2196f3;
    border-radius: 8px;
    font-family: Arial, sans-serif;
    font-size: 16px;
`

interface CurrencyItemProps {
    code: string;
    rate: number;
    amount: number;
    currency: string;
    country: string;
}

export default function CurrencyItem({ code, rate, amount, currency, country } : CurrencyItemProps) {

    return (
        <CurrencyItemWrapper>
            {code}: {rate.toFixed(2)} CZK / {amount} {currency} ({country})
        </CurrencyItemWrapper>
    )
}
