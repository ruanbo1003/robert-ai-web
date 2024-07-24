'use client';

import { useQuery, UseQueryResult } from "@tanstack/react-query"


export function useFetchApi<respType>(apiKey: string, apiFn: any, enabled: boolean = true) : UseQueryResult<respType, Error> {
    return useQuery({
        queryKey: [apiKey],
        queryFn: apiFn,
        enabled: enabled
    });
}
