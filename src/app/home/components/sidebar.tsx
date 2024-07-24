'use client';

import { BsPlus, BsFillLightningFill, BsGearFill, BsChatDotsFill, BsTranslate, BsBookmarks } from "react-icons/bs";
import { FaHome, FaFire, FaPoo } from 'react-icons/fa';
import { useCustomRedirect } from "@/app/components/RedirectTo"


export default function Sidebar() {
    return (
        // sidebar
        <div className="flex flex-col justify-between top-0 left-0 h-full w-16 bg-slate-500 border-r-1">
            {/* just empty div, to make menus in the center */}
            <div className="mt-1">
            </div>

            {/* menus */}
            <div className="mt-0">
                <SideBarIcon icon={<FaHome size="28"/>} tips="home" to="/home/dashboard" />
                <hr className="bg-slate-100 border border-slate-400 rounded-full mx-2" />

                {/*<SideBarIcon icon={<FaFire size="28"/>} tips="fire"  to="/home" />*/}
                {/*<SideBarIcon icon={<BsPlus size="32"/>} tips="plus" to="/home"/>*/}
                {/*<SideBarIcon icon={<BsFillLightningFill size="20" />} tips="lightning" to="/home" />*/}
                {/*<SideBarIcon icon={<FaPoo size="20"/>} tips="shit" to="/home" />*/}
                {/*<hr className="bg-slate-100 border border-slate-400 rounded-full mx-2" />*/}

                {/*<SideBarIcon icon={<BsChatDotsFill size="20"/>} tips="chat" to="/home/ai/chat" />*/}
                <SideBarIcon icon={<BsTranslate size="20"/>} tips="translate" to="/home/ai/translate" />
                <SideBarIcon icon={<BsBookmarks size="20"/>} tips="book marks" to="/home/bookmark" />
            </div>

            {/*/ setting */}
            <div className="bottom-0">
                <hr className="bg-slate-100 border border-slate-400 rounded-full mx-2 my-2" />
                <SideBarIcon icon={<BsGearFill size="20"/>} tips="setting"  to="/home"/>
            </div>

        </div>
    )
}


function SideBarIcon(props: { icon: any, tips: string, to: string }) {
    const icon = props.icon
    const tips = props.tips
    const toPath = props.to

    const { redirectTo } = useCustomRedirect();
    const handleClick = () => {
        redirectTo(toPath);
    };

    return (
        <div onClick={ handleClick } className="relative flex items-center justify-center left-0 h-10 w-10 mt-4 mb-4 mx-auto shadow-lg bg-slate-500
                            text-white text-6xl hover:bg-slate-600 hover:text-blue-500 rounded-3xl hover:rounded-xl transition-all duration-300
                            ease-linear group">
            {icon}
            <span className="absolute w-auto p-2 m-2 min-w-max left-12 rounded-md shadow-md text-white bg-slate-500
                            text-sm font-bold transition-all duration-10 scale-0 origin-left group-hover:scale-100">
                {tips}
            </span>
        </div>
    )
}
