import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import rates from '../rates/rates.json'
import CurrencyItem from "./CurrencyItem.tsx";
import ConverterForm from "./ConverterForm.tsx";

const LayoutWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`

export default function Layout() {

    const { data } = useQuery({ queryKey: ['rates'], queryFn: () => rates })

    return (
        <LayoutWrapper>
            {data?.map(item => <CurrencyItem key={item.code} {...item} />)}
            Currency converter:
            <ConverterForm />
        </LayoutWrapper>
    )
}
