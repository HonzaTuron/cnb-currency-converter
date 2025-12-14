import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import CurrencyItem from "./CurrencyItem.tsx";
import ConverterForm from "./ConverterForm.tsx";
import { loadRates } from "../queries/loadRates.ts";

const LayoutWrapper = styled.div`
    width: 420px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    
    .error-message {
        color: red;
        font-weight: bold;
        margin: 16px 0;
    }
`

export default function Layout() {
    const { data, isPending } = useQuery({ queryKey: ['rates'], queryFn: loadRates })

    return (
        <LayoutWrapper>
            {(!isPending && !data?.length) ? <div className="error-message">Couldn't load data</div>: (
                <>
                    {data?.map(item => <CurrencyItem key={item.code} {...item} />)}
                    Currency converter:
                    <ConverterForm />
                </>)
            }
        </LayoutWrapper>
    )
}
