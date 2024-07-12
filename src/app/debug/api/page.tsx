'use client';

import { TestApi } from "@/api/test"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useFetchApi } from "@/hooks/api"
import { FetchApi} from "@/api/fetch"

interface postDataReq {
    name: string,
    age: number,
}

interface postDataResp {
    name: string,
    age: number,
    email: string,
}

interface getParameterResp {
    name: string,
    age: number
}


export default function Home() {
    const addDataPayload = {
        name: 'robert'
    }
    const addFun = () => FetchApi().post("/api/test/add", addDataPayload)
    const { data: addResp, isPending: addPending, isError: addIsError, error: addError } = useFetchApi('add', addFun);
    console.log('add:', addResp, addPending, addIsError, addError)

    // different types of http requests - begin
    // basic get query and response
    const basic_get_url = "/api/test/debug/basic_get"
    const { data: basicGetData, isError: isBasicGetError, error: basicGetError, refetch} = useFetchApi(
        "basic_get",
        () => FetchApi().get(basic_get_url),
        false
    )
    console.log('basic-get:', basicGetData, isBasicGetError, basicGetError)

    const handleBasicGetBtn = (event) => {
        event.preventDefault();
        refetch()
    }

    // get query with parameters, and response with payload
    const { mutate: getParameterFn } = useMutation({
        mutationFn: (params: Record<string, any>) => {
            const url = `/api/test/debug/get_parameters?${params.toString()}`
            return FetchApi().get(url)
        },
        onSuccess: (data: getParameterResp) => {
            toast.success(JSON.stringify(data), { position: 'top-center', autoClose: 1000})
        },
        onError: (error, variables) => {
            toast.error(JSON.stringify(error), { position: 'top-center', autoClose: 1000})
        }
    })

    const handleGetWithPathParameterBtn = (event) => {
        event.preventDefault();

        const params : Record<string, any> = new URLSearchParams();
        params.append('name', 'robert');
        params.append('age', 100)
        getParameterFn(params)
    }

    // basic get query, and response with 401
    const { mutate: getAnd401Fn } = useMutation({
        mutationFn: () => TestApi().GetAnd401(),
        onSuccess: (data) => {
            toast.success(JSON.stringify(data), { position: 'top-center', autoClose: 1000})
        },
        onError: (error, variables) => {
            toast.error(JSON.stringify(error), { position: 'top-center', autoClose: 1000})
        }
    })
    const handleGetAnd401Btn = (event) => {
        event.preventDefault();
        getAnd401Fn()
    }

    // post with payload, response with payload
    const { mutate: postDataFn } = useMutation({
        mutationFn: (payload: postDataReq) => FetchApi().post("/api/test/debug/post_data", payload),
        onSuccess: (data: postDataResp) => {
            toast.success(JSON.stringify(data), { position: 'top-center', autoClose: 1000})
        },
        onError: (error, variables) => {
            toast.error(JSON.stringify(error), { position: 'top-center', autoClose: 1000})
        }
    })

    const handlePostWithBodyBtn = (event) => {
        event.preventDefault();

        const payload: postDataReq = {name: 'robert', age: 10};
        postDataFn(payload)
    }

    // post with payload, response 401
    const { mutate: postData401Fn } = useMutation({
        mutationFn: (payload: postDataReq) => FetchApi().post(
            "/api/test/debug/post_data_401",
            payload
        ),
        onSuccess: (data: postDataResp) => {
            toast.success(JSON.stringify(data), { position: 'top-center', autoClose: 1000})
        },
        onError: (error, variables) => {
            toast.error(JSON.stringify(error), { position: 'top-center', autoClose: 1000})
        }
    })
    const handlePostAnd401Btn = (event) => {
        event.preventDefault();

        const payload: postDataReq = { name: 'Jack', age: 20 };
        postData401Fn(payload)
    }
    // different types of http requests - end


    return (
        <main className="flex w-1/2 h-full mx-auto flex-col items-start justify-start px-2 py-6 bg-gray-200">
            <div className="bg-blue-100 w-full">
                <div className="mt-4">
                    <h1 className="text-blue-600">useFetchApi pending test, GET and POST with body</h1>
                </div>
                <div>
                    <p>add-POST : {addPending ? "add pending" : JSON.stringify(addResp)}</p>
                </div>
            </div>

            <div className="bg-sky-100 w-full mt-4">
                <div className="mt-1">
                    <h1 className="text-blue-600 text-lg">different types of http requests</h1>
                </div>
                <div className="mt-1 flex flex-row">
                    <button onClick={handleBasicGetBtn} className="bg-blue-400 w-44 rounded-lg">GET-basic
                    </button>
                    <h6 className="ml-2">query data when click</h6>
                </div>
                <div className="mt-1 flex flex-row">
                    <button onClick={handleGetWithPathParameterBtn} className="bg-blue-400 w-44 rounded-lg">GET with parameter
                    </button>
                    <h6 className="ml-2">query data when click, pass parameter to get query path</h6>
                </div>

                <div className="mt-2 flex flex-row">
                    <button onClick={handleGetAnd401Btn} className="bg-blue-400 w-44 rounded-lg">GET then 401
                    </button>
                    <h6 className="ml-2">query data when click, server response 401</h6>
                </div>

                <div className="mt-2 flex flex-row">
                    <button onClick={handlePostWithBodyBtn} className="bg-blue-400 w-44 rounded-lg">POST with body
                    </button>
                    <h6 className="ml-2">useMutation post data when click, server response body</h6>
                </div>

                <div className="mt-2 flex flex-row">
                    <button onClick={handlePostAnd401Btn} className="bg-blue-400 text-sm w-44 rounded-lg">POST with
                        body then 401
                    </button>
                    <h6 className="ml-2">useMutation post data when click, server response 401</h6>
                </div>
            </div>
        </main>
    );
}
