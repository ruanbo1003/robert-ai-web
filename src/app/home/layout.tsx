import React from "react"

import Sidebar from "@/app/home/components/sidebar";
import TopNavBar from "@/app/home/components/top-nav-bar"


export default function HomeLayout({
    children,
} : {
    children: React.ReactNode
}) {
    return (
        <div id="home" className="flex flex-row w-full h-full">
            <div id="home-left-sidebar" className="">
                <Sidebar />
            </div>
            <div id="home-right" className="w-full h-full">
                <div id="home-right-top-nav">
                    <TopNavBar/>
                </div>
                <div id="home-right-main-content" className="w-full" style={{ height: 'calc(100vh - 60px)' }}>
                    {children}
                </div>

                {/*<div className="flex flex-col justify-start text-center">*/}
                {/*    <TopNavBar/>*/}
                {/*    <div className="w-full h-full">*/}
                {/*        {children}*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}
