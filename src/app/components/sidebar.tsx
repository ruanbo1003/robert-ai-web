'use client';

import { BsPlus, BsFillLightningFill, BsGearFill, BsChatDotsFill, BsTranslate } from "react-icons/bs";
import { FaHome, FaFire, FaPoo } from 'react-icons/fa';


export default function Sidebar() {
    return (
        // sidebar
        <div className="fixed flex flex-col justify-between top-0 left-0 h-screen w-16 bg-slate-500 border-r-1">
            {/* menus */}
            <div className="mt-20">
                <SideBarIcon icon={<FaHome size="28"/>} tips="home"/>

                <hr className="bg-slate-100 border border-slate-400 rounded-full mx-2"/>

                <SideBarIcon icon={<FaFire size="28"/>} tips="fire"/>
                <SideBarIcon icon={<BsPlus size="32"/>} tips="plus"/>
                <SideBarIcon icon={<BsFillLightningFill size="20"/>} tips="lightning"/>
                <SideBarIcon icon={<FaPoo size="20"/>} tips="shit"/>

                <hr className="bg-slate-100 border border-slate-400 rounded-full mx-2" />

                <SideBarIcon icon={<BsChatDotsFill size="20"/>} tips="chat"/>
                <SideBarIcon icon={<BsTranslate size="20"/>} tips="translate"/>
            </div>

            {/*/ setting */}
            <div className="bottom-0">
                <hr className="bg-slate-100 border border-slate-400 rounded-full mx-2 my-2" />
                <SideBarIcon icon={<BsGearFill size="20"/>} tips="setting"/>
            </div>

        </div>
    )
}

// class SideBarIcon extends Component<{ icon: any, tips: string }> {
function SideBarIcon(props: { icon: any, tips: string }) {
    const icon = props.icon
    const tips = props.tips

    return (
        <div className="relative flex items-center justify-center left-0 h-10 w-10 mt-4 mb-4 mx-auto shadow-lg bg-slate-500
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

// Why the Button go does not at the bottom of the sidebar.