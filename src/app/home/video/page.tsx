
'use client';

import { Slider } from "@/app/components/player-slider"

import { CiPlay1, CiStop1 } from "react-icons/ci"
import { IoPlaySkipForward, IoPlaySkipBack } from "react-icons/io5";
// import ReactPlayer from 'react-player'
import { useState } from "react"
import dynamic from "next/dynamic"


export default function Page() {
    const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

    const [isPlay, setIsPlay] = useState(false);

    const handlePlayBtn = (event) => {
        event.preventDefault();

        setIsPlay(!isPlay);
    }

    return (
        <div id="video" className="flex h-full w-full justify-center items-center">
            <ReactPlayer url='https://www.youtube.com/watch?v=BNB9mkO0sOw'/>
            <ReactPlayer url='https://www.youtube.com/watch?v=BNB9mkO0sOw'/>
            <ReactPlayer url='https://www.youtube.com/watch?v=BNB9mkO0sOw'/>
            <ReactPlayer url='https://www.youtube.com/watch?v=BNB9mkO0sOw'/>
            <ReactPlayer url='https://www.youtube.com/watch?v=BNB9mkO0sOw'/>
        </div>

    )
}
