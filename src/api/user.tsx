
'use client';

import { FetchApi } from "@/api/fetch"
import { useQuery } from "@tanstack/react-query"

export interface SignupPayload {
    name: string;
    password: string;
}


export function UserApi() {

    return {
        Login,
        Signup,
        NameExist,
    }

    function Login() {
        return useQuery({
            queryKey: ['use login'],
            queryFn: () => {
                return FetchApi().get('/api/user/login')
            }
        })
    }

    function Signup(payload: SignupPayload) {
        console.log('Signup payload:', payload)
        return FetchApi().post('/api/user/signup', payload)
    }

    function NameExist(name: string) {
        const payload = {
            'name': name
        }
        return FetchApi().post('/api/user/exist', payload)
    }
}
