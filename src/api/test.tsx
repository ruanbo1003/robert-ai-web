'use client';

import { FetchApi } from "@/api/fetch"
import { useQuery } from "@tanstack/react-query"

export function TestApi() {
    return {
        Hello,
        InvalidAuth,
        RequestForbidden,
    }

    function Hello() {
        return useQuery({
            queryKey: ['hello'],
            queryFn: () => {
                return FetchApi().get('/api/hello')
            }
        })
    }

    function InvalidAuth() {
        return useQuery({
            queryKey: ['invalid auth'],
            queryFn: () => {
                try {
                    return FetchApi().get('/api/test/401')
                } catch {
                    console.log("InvalidAuth catch")
                }
            }
        })
    }

    function RequestForbidden() {
        return useQuery({
            queryKey: ['request forbidden'],
            queryFn: () => {
                try {
                    return FetchApi().get('/api/test/403')
                } catch {
                    console.log("InvalidAuth catch")
                }
            }
        })
    }
}
