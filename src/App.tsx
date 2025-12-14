import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

export default function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <Layout />
        </QueryClientProvider>
    )
}
