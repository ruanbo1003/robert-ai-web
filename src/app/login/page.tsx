'use client';

import { Input } from "@/components/ui/input"
import { User, LockKeyhole } from "lucide-react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useCustomRedirect } from "@/app/components/RedirectTo"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { UserApi, LoginReq, LoginResp } from "@/api/user"


export default function Page() {
    const { redirectTo } = useCustomRedirect();
    const handleSignupBtn = () => {
        redirectTo('/signup');
    };

    const [loginData, setLoginData] = useState<LoginReq>({
        name: '',
        password: '',
    })

    const nameValueChange = (event) => {
        loginData.name = event.target.value
    }
    const passwordValueChange = (event) => {
        loginData.password = event.target.value
    }

    const { mutate: loginFn } = useMutation({
        mutationFn: (payload: LoginReq) => {
            // console.log('login:', payload)
            return UserApi().Login(payload)
        },
        onSuccess: (data: LoginResp) => {
            localStorage.setItem("authToken", data.token)
            redirectTo('/home');
            // toast.success("login success:" + data.token, {position: 'top-center', autoClose: 1000})
        },
        onError: (error) => {
            localStorage.removeItem("authToken")
            // console.log("login failed:", error)
            toast.error("login failed:" + error.toString(), {position: 'top-center', autoClose: 1000})
        }
    })

    const handleLoginBtn = (event) => {
        event.preventDefault();
        loginFn(loginData)
    }

    return (
        <div>
            <section className="flex justify-center items-center bg-gray-50 min-h-screen">
                {/* login */}
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-5xl p-2 absolute">
                    {/* logo and form */}
                    <div className="md:w-1/2 px-10 flex-col">
                        {/* logo */}
                        <div className="flex-row justify-center items-center justify-items-center mt-20">
                            <div className="flex justify-center text-center">
                                <img src="/icon.png" className="size-24 rounded-full"></img>
                            </div>
                            <p className="text-center text-2xl font-bold text-blue-600">Your SWE & AI tools</p>
                        </div>

                        {/* form */}
                        <div className="mt-20">
                            <h2 className="font-bold text-2xl text-blue-500">Login</h2>
                            <label className="inline relative">If you already a member, easily log in.</label>

                            <form action="" className="flex flex-col gap-4">
                                <div className="relative mt-8">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <User className="ml-1"/>
                                </span>
                                    <Input type="text" className="w-full pl-10 rounded-xl border bg-white" name="email"
                                           placeholder="Username" onChange={nameValueChange}></Input>
                                </div>
                                <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <LockKeyhole className="ml-1"/>
                                </span>
                                    <Input type="text" className="w-full pl-10 rounded-xl border bg-white"
                                           name="password"
                                           placeholder="Password" onChange={passwordValueChange}>
                                    </Input>
                                </div>
                                <button onClick={handleLoginBtn}
                                    className="bg-blue-600 text-white rounded-lg py-2 hover:scale-105 duration-300">Login
                                </button>
                            </form>

                            {/*<p className="mt-3 text-xs border-b border-gray-400 py-4">Forgot your password?</p>*/}
                            <div className="text-l flex mt-3 justify-between items-center">
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                <p>Don't have a account?</p>
                                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-105 duration-300"
                                        onClick={handleSignupBtn}>
                                    sign up
                                </button>
                            </div>

                            <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
                                <hr className="border-gray-500"/>
                                <p className="text-center text-sm">OR</p>
                                <hr className="border-gray-500"/>
                            </div>

                            <button
                                className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-3" x="0px" y="0px" width="25"
                                     height="25"
                                     viewBox="0 0 48 48">
                                    <path fill="#fbc02d"
                                          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    <path fill="#e53935"
                                          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                    <path fill="#4caf50"
                                          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                    <path fill="#1565c0"
                                          d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                Login with Google (TBD)
                            </button>
                        </div>
                    </div>

                    {/* image */}
                    <div className="w-1/2 md:block hidden">
                        <img src="/dog.jpg" alt="" className="rounded-2xl"/>
                    </div>

                </div>

            </section>
        </div>
    )
}
