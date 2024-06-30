
'use client';

import { FetchApi } from "@/api/fetch"
import { useQuery } from "@tanstack/react-query"


export function UserApi() {

    return {
        Login,
    }

    function Login() {
        return useQuery({
            queryKey: ['use login'],
            queryFn: () => {
                return FetchApi().get('/api/user/login')
            }
        })
    }
}
