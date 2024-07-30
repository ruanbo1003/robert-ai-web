
'use client';

import { Slider } from "@/app/components/player-slider"

import { CiPlay1, CiStop1 } from "react-icons/ci"
import { IoPlaySkipForward, IoPlaySkipBack } from "react-icons/io5";
import ReactPlayer from 'react-player'
import { useState } from "react"


export default function Page() {
    const [isPlay, setIsPlay] = useState(false);

    const handlePlayBtn = (event) => {
        event.preventDefault();

        setIsPlay(!isPlay);
    }

    return (
        <div id="music" className="flex h-full w-full justify-center items-center">
            <div id="music-player" className="flex flex-row w-2/3 min-w-96 max-w-xl h-32 bg-gray-100 rounded-lg">
                <div className=" h-full">
                    <img id="music-image" src="/music.png" alt="music-image" className="w-full h-full object-cover rounded-lg">
                    </img>
                </div>
                <div className="w-full">
                    <div className="flex flex-col h-full gap-4 justify-center rounded-lg mx-2">
                        <label className="text-blue-600 font-bold">勇气</label>
                        <Slider defaultValue={[50]} max={100} step={1}
                                onValueChange={(value) => console.log("value:", value)}/>
                        <div className="flex flex-row justify-around">
                            <IoPlaySkipBack className="text-2xl hover:cursor-pointer hover:scale-105" />

                            {
                                isPlay ? <CiStop1 className="text-2xl hover:cursor-pointer  hover:scale-105" onClick={handlePlayBtn} /> : <CiPlay1 className="text-2xl hover:cursor-pointer hover:scale-105" onClick={handlePlayBtn} />
                            }

                            <IoPlaySkipForward className="text-2xl hover:cursor-pointer hover:scale-105" />


                        </div>
                    </div>

                </div>
            </div>
            <div id="react-player">
                <ReactPlayer url='https://www.youtube.com/watch?v=BNB9mkO0sOw'/>
            </div>
        </div>

    )
}
