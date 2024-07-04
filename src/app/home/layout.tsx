import React from "react"

import Sidebar from "@/app/home/components/sidebar";
import TopNavBar from "@/app/home/components/top-nav-bar"


export default function HomeLayout({
    children,
} : {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-row w-full h-full">
            <div className="">
                <Sidebar />
            </div>
            <div className="w-full">
                <div className="flex flex-col justify-start text-center">
                    <TopNavBar/>
                    <div className="w-full h-3/4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
