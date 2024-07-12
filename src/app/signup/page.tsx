'use client';

import {Checkbox} from "@/components/ui/checkbox"
import { useCustomRedirect } from "@/app/components/RedirectTo"
import { UserApi, SignupReq, SignupResp } from "@/api/user"
import { useRef, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from "@tanstack/react-query"


export default function Page() {
    const [signupPayload, setSignupPayload] = useState<SignupReq>({
        name: '',
        password: '',
    });

    const [repeatedPassword, setRepeatedPassword] = useState('');

    const { redirectTo } = useCustomRedirect();
    const handleLoginBtn = () => {
        redirectTo('/login');
    };

    const { mutate: signupFn, isPending: isSignupPending } = useMutation({
        mutationFn: (data: any) => UserApi().Signup(data),
        onSuccess: (data) => {
            console.log('signup success')
            toast.success('signup success, go to login.', {position: "top-center", autoClose: 1000});
            redirectTo('/login');
        },
        onError: (error) => {
            console.log('signup failed:', error)
        }
    })

    const { mutate: nameExistFn } = useMutation({
        mutationFn: () => UserApi().NameExist(signupPayload.name),
        onSuccess: (data: SignupResp) => {
            if(data.exist) {
                // name exists, do not sign up
                toast.error('name already exists.', {position: "top-center", autoClose: 1000});
                return
            }

            // name not exists, do sign up
            signupFn(signupPayload)
        },
        onError: (error) => {
            console.log('exist failed:', error)
        }
    })

    const nameValueChange = (event) => {
        signupPayload.name = event.target.value
    }
    const passwordValueChange = (event) => {
        signupPayload.password = event.target.value
    }
    const password2ValueChange = (event) => {
        setRepeatedPassword(event.target.value)
    }

    const HandleSignupBtn = (event) => {
        event.preventDefault();

        if(!signupPayload.name || !signupPayload.password) {
            toast.error('please enter username and password', {position: "top-center", autoClose: 1000});
            return
        }
        if(signupPayload.password != repeatedPassword) {
            toast.error('passwords should be same.', {position: "top-center", autoClose: 1000});
            return
        }

        nameExistFn()
    }

    return (
        <div>
            <section className="flex justify-center items-center bg-gray-50 min-h-screen">
                {/* sign up */}
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-5xl p-2">
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
                            <h2 className="font-bold text-2xl text-blue-500">Sign up</h2>

                            <p className="text-sm mt-2 text-gray-600">Please complete to create your account.</p>

                            <form action="" className="flex flex-col gap-4">
                                <input type="text" className="p-2 mt-8 rounded-xl border" name="username"
                                       placeholder="Username" onChange={nameValueChange}></input>
                                <div className="relative">
                                    <input type="text" className="w-full p-2 rounded-xl border" name="password"
                                           placeholder="password" onChange={passwordValueChange}>
                                    </input>
                                </div>
                                <div className="relative">
                                    <input type="text" className="w-full p-2 rounded-xl border" name="password2"
                                           placeholder="repeat password" onChange={password2ValueChange}>
                                    </input>
                                </div>

                                {/* agree checkbox */}
                                <div className="flex justify-start text-sm text-blue-500">
                                    <Checkbox className="ml-1 mt-0.5"/>
                                    <h2 className="ml-2">Agree to our Terms of Service and Privacy Policy.</h2>
                                </div>

                                <button onClick={HandleSignupBtn}
                                    className="bg-blue-600 text-white rounded-lg py-2 hover:scale-105 duration-300">Sign
                                    Up
                                </button>
                            </form>

                            <div className="text-sm flex mt-3 justify-between items-center">
                                <p>Already have an account?</p>
                                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-105 duration-300"
                                    onClick={handleLoginBtn}>
                                    sign in
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* image */}
                    <div className="w-1/2 md:block hidden">
                        <img src="/dog.jpg" alt="" className="rounded-2xl"/>
                    </div>

                </div>

            </section>
            <ToastContainer />
        </div>
    )
}
