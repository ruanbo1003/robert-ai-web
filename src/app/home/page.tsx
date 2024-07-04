'use client';

export default function Page() {
    return (
        <></>
    )
}


// class SideBarIcon extends Component<{ icon: any, tips: string }> {
function SideBarIcon(props: { icon: any, tips: string }) {
    const icon = props.icon
    const tips = props.tips
    return (
        <div className="relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto shadow-lg bg-stone-700
                            text-green-500 hover:bg-green-600 rounded-3xl hover:rounded-xl transition-all duration-300
                            ease-linear group">
            {icon}
            <span className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-stone-600
                            text-xs font-bold transition-all duration-10 scale-0 origin-left group-hover:scale-100">
                {tips}
            </span>
        </div>
    )
}
