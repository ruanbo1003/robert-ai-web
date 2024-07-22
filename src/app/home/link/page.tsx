'use client';

import * as React from "react"

import { useEffect, useState } from "react"
import { BookmarkApi, BookmarkItem } from "@/api/bookmark"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { useFetchApi } from "@/hooks/api"


export default function Page() {
    const isAdmin = true

    const [activeClassify, setActiveClassify] = useState("python")
    const mainClassify = ["python", "c++", "golang", "react"]

    const { data: classifyData } = useFetchApi('add', BookmarkApi().GetClassifyList());
    console.log("classifyData:", classifyData)

    useEffect(() => {
        console.log('activeClassify:', activeClassify)
    }, [activeClassify])

    const [bookMark, setBookMark] = useState<BookmarkItem>({
        classify: '',
        name: '',
        tips: '',
        url: '',
    })

    const { mutate: addBookmarkFn } = useMutation({
        mutationFn: (payload: BookmarkItem) => {
            return BookmarkApi().Add(payload)
        },
        onSuccess: (data) => {
            console.log("addBookmarkFn success:", data)
            setBookMark({classify: '', name: '', tips: '', url: ''})
        },
        onError: (error) => {
            console.log("addBookmarkFn error:", error)
        }
    })

    const handleAddBookmarkBtn = (e) => {
        e.preventDefault();

        console.log(bookMark)
        addBookmarkFn(bookMark)
    }

    return (
        <div id="link-page" className="flex flex-row w-full h-full">
            <div className="flex flex-col h-full bg-gray-100 w-24">
                {
                    mainClassify.map((name) => (
                        <ClassifyMarkItem key={name} title={name} onItemClick={() => setActiveClassify(name)} isActive={name === activeClassify} />
                    ))
                }
            </div>
            <div className="flex flex-col h-auto lg:w-2/3 md:3/4 sm:w-4/5 mx-auto mt-8">
                {/* book marks */}
                <div className="">
                    <div className="grid gap-5 grid-cols-4 justify-center items-center">
                        <LinkItem title="a" tips="b" link="c"/>
                        <LinkItem title="a" tips="b" link="c"/>
                        <LinkItem title="a" tips="b" link="c"/>
                        <LinkItem title="a" tips="b" link="c"/>
                        <LinkItem title="a" tips="b" link="c"/>
                        <LinkItem title="a" tips="b" link="c"/>
                        <LinkItem title="a" tips="b" link="c"/>
                    </div>
                </div>

                {/* admin */}
                {
                    isAdmin && <div className="grid gap-1 w-1/2 max-w-96 mt-20 ">
                        <Label htmlFor="email">classify</Label>
                        <Input type="email" id="classify" placeholder="classify" onChange={(e) => {bookMark.classify = e.target.value}}/>
                        <Label htmlFor="email">name</Label>
                        <Input type="email" id="name" placeholder="name" onChange={(e) => {bookMark.name = e.target.value}}/>
                        <Label htmlFor="email">tips</Label>
                        <Input type="email" id="tips" placeholder="tips" onChange={(e) => {bookMark.tips = e.target.value}}/>
                        <Label htmlFor="email">url</Label>
                        <Input type="email" id="url" placeholder="url" onChange={(e) => {bookMark.url = e.target.value}}/>
                        <Button type="submit" className="bg-blue-600" onClick={handleAddBookmarkBtn}>Add</Button>
                    </div>
                }
            </div>


        </div>

    )
}


function ClassifyMarkItem({title, onItemClick, isActive}) {
    return (
        <button onClick={onItemClick}
                className={`my-2 rounded-sm hover:bg-gray-300 ${isActive ? "bg-gray-300" : ""}`}>{title}</button>
    )
}


function LinkItem(props: { title: any, tips: string, link: string }) {
    const title = props.title
    const tips = props.tips
    const link = props.link

    const openInNewTa = (url) => {
        window.open(url, "_blank", "noreferrer")
    }

    return (
        <div className="flex flex-col bg-gray-100 rounded-lg border-2 hover:border-blue-600 hover:cursor-pointer"
             onClick={() => openInNewTa("https://www.baidu.com")}>
            <div className="ml-2 mt-2 text-lg text-blue-600">
                {title}
            </div>
            <div className="ml-2 mt-1 text-sm">
                Hello world, Hello world,Hello world,Hello world.
            </div>
        </div>
    )
}