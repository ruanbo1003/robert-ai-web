'use client';

import { TestApi } from "@/api/test"
import { useMutation } from "@tanstack/react-query"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useCustomRedirect } from "@/app/components/RedirectTo"


export default function Home() {
    const { redirectToLogin } = useCustomRedirect();

    const { status, data: helloData, error, isFetching } = TestApi().Hello();
    console.log('top-hello1:', status, helloData, error, isFetching, typeof helloData)

    const handleGoBtn = async (event) => {
        event.preventDefault();

        const res = await TestApi().Hello()
        console.log('res:', res)
    }

    const handleAxios401Btn = async (event) => {
        event.preventDefault();

        const res = await TestApi().AxiosInvalidAuth
        console.log('res:', res)
    }

    const handleFetch401Btn = async (event) => {
        event.preventDefault();

        const { status, data, error, isFetching } = TestApi().InvalidAuth();
        console.log('fetch 401:', data)
    }

    const { mutate: userSignup, isPending} = useMutation({
        mutationFn: (name: string) => TestApi().Add(name),
        onSuccess: (data) => {
            console.log('signup ok:', data)
            toast.success('signup successfully.', {position: "top-center"});
            redirectToLogin()
        },
        onError: (error, variables) => {
            console.log('signup error:', error, variables)
        }
    })

    const { mutate: delayTestFn, isPending: isDelayPending} = useMutation({
        mutationFn: () => TestApi().Delay(),
        onSuccess: (data) => {
            console.log('delay ok:', data)
            toast.info("delay success and end", {position: 'top-center'})
        },
        onError: (error, variables) => {
            toast.info("delay error")
        }
    })

    const handlerUseMutation = (event) => {
        event.preventDefault();

        console.log('useMutation button clicked')

        const name = "robert";
        userSignup(name)
    }

    const handlerDelayBtn = (event) => {
        event.preventDefault();
        delayTestFn()
    }

    const handlerCustomResponseBtn = (event) => {
        event.preventDefault();

        const resp = TestApi().Resp();
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1>{helloData?.reply}</h1>
            </div>

            <div>
                <button onClick={handleGoBtn} className="bg-blue-500 w-24 rounded-lg">Go</button>
            </div>

            <div>
                <button onClick={handleAxios401Btn} className="bg-blue-500 w-40 rounded-lg">Axios 401</button>
                <button onClick={handleFetch401Btn} className="ml-4 bg-blue-500 w-40 rounded-lg">Fetch 401</button>
                <button onClick={handlerUseMutation} className="ml-4 bg-blue-500 w-40 rounded-lg">Add(useMutation)
                </button>
            </div>

            <div>
                <button onClick={handlerDelayBtn} disabled={isDelayPending}
                        className="ml-4 bg-blue-500 w-40 rounded-lg disabled:bg-red-400">Button Delay
                </button>
            </div>

            <div>
                <button onClick={handlerCustomResponseBtn}
                        className="ml-4 bg-blue-500 w-40 rounded-lg disabled:bg-red-400">Custom Response
                </button>
            </div>

            <ToastContainer/>
        </main>
    );
}

