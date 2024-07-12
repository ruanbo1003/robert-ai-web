
import { useQuery } from "@tanstack/react-query"


export function useFetchApi(apiKey: string, apiFn: any, enabled: boolean = true) {
    return useQuery({
        queryKey: [apiKey],
        queryFn: apiFn,
        enabled: enabled
    });
}
