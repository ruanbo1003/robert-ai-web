
'use client';

import dynamic from "next/dynamic"


export default function Page() {
    const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

    return (
        <div id="music" className="flex h-full w-full justify-center items-center">
            <div>
                <ReactPlayer url='https://www.youtube.com/watch?v=BNB9mkO0sOw'/>
            </div>

        </div>
    )
}
