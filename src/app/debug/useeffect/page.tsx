'use client';

import { useEffect, useState } from "react"


export default function Page() {
    const [count, setCount] = useState(0);
    const [isInit, setIsInit] = useState(false);

    useEffect(() => {
        console.log("no dependence")
    }, [])

    useEffect(() => {
        console.log("dependence: count:", count)
    }, [count])

    useEffect(() => {
        console.log("dependence: isInit:", isInit)
    }, [isInit])


    return (
        <div id="debug-use-effect" className="flex flex-col w-2/3 mx-auto mt-5">
            <div className="mt-2">
                <p>count: {count}</p>
            </div>
            <div className="mt-2">
                <button className="bg-blue-500 rounded-lg w-12" onClick={() => {
                    setCount(count + 1)
                }}>+1
                </button>
            </div>
            <div className="mt-2">
                <button className="bg-blue-500 rounded-lg w-12" onClick={() => {
                    setIsInit(true)
                }}>
                    init
                </button>
            </div>
        </div>
    )
}