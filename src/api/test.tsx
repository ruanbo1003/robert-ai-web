'use client';

import { FetchApi } from "@/api/fetch"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function TestApi() {
    return {
        Add,
        Delay,
        Resp,
        Hello,
        InvalidAuth,
        AxiosInvalidAuth,
        RequestForbidden,
    }

    function Add(name: string) {
        const data = {
            'name': name
        }
        return FetchApi().post('/api/test/add', data)
    }

    function Delay() {
        return FetchApi().get('/api/test/delay')
    }

    function Resp() {
        return FetchApi().get('/api/test/resp')
    }

    function Hello() {
        return useQuery({
            queryKey: ['hello'],
            queryFn: () => {
                return FetchApi().get('/api/test/hi')
            },
            enabled: true
        })
    }

    function AxiosInvalidAuth() {
        const options = {
            method: 'get',
            url: 'http://localhost:8000/api/test/401',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }
        return axios(options)
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
