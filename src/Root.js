import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Root() {
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );
}

export default Root;
