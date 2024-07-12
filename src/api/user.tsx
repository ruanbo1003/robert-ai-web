
'use client';

import { FetchApi } from "@/api/fetch"
import { useQuery } from "@tanstack/react-query"


export interface SignupReq {
    name: string;
    password: string;
}

export interface SignupResp {
    exist: boolean
}

export interface LoginReq {
    name: string,
    password: string,
}

export interface LoginResp {
    token: string
}


export function UserApi() {

    return {
        Login,
        Signup,
        NameExist,
    }

    function Login(payload: LoginReq) {
        return FetchApi().post('/api/user/login', payload)
    }

    function Signup(payload: SignupReq) {
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
