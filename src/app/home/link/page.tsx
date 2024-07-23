'use client';

import * as React from "react"

import { useEffect, useState } from "react"
import { BookmarkApi, NewBookmarkItem, BookmarkListResp, BookmarkItem } from "@/api/bookmark"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { useFetchApi } from "@/hooks/api"


export default function Page() {
    const [isAdding, setIsAdding ] = useState(false)

    const [activeClassify, setActiveClassify] = useState("")
    const [bookmarkItems, setBookmarkItems] = useState<[BookmarkItem]>([])

    const { data: bookmarkList, isPending: isBookmarkListPending } = useFetchApi<BookmarkListResp>('bookmark-get-classify', BookmarkApi().GetBookmarks);
    console.log('bookmarkList:', bookmarkList, typeof bookmarkList)

    useEffect(() => {
        if(!activeClassify) {
            return
        }
        setBookmarkItems(bookmarkList.bookmarks[activeClassify])
    }, [activeClassify])

    useEffect(() => {
        if(!bookmarkList) {
            return
        }

        setActiveClassify(bookmarkList.classify[0])
        // console.log('bookmarkList in useEffect:', bookmarkList.classify, bookmarkList.bookmarks)
    }, [bookmarkList])

    const [bookMark, setBookMark] = useState<NewBookmarkItem>({
        classify: '',
        name: '',
        tips: '',
        url: '',
    })

    const { mutate: addBookmarkFn } = useMutation({
        mutationFn: (payload: NewBookmarkItem) => {
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
                    !isBookmarkListPending && bookmarkList.classify.map((name) => (
                        <ClassifyMarkItem key={name} title={name} onItemClick={() => setActiveClassify(name)}
                                          isActive={name === activeClassify}/>
                    ))
                }

                <button className="bg-blue-400 rounded-sm" onClick={() => setIsAdding(!isAdding)}>{isAdding ? "Hidden" : "Add"}</button>

            </div>
            <div className="flex flex-col h-auto lg:w-2/3 md:3/4 sm:w-4/5 mx-auto mt-8 justify-start">
                {/* book marks */}
                <div className="">
                    <div
                        className="grid gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-center items-center">
                        {
                            !isBookmarkListPending && activeClassify && bookmarkItems.map((item: BookmarkItem, i) => (
                                <LinkItem key={i} title={item.name} tips={item.tips} link={item.url}/>
                            ))
                        }
                    </div>
                </div>

                {/* add */}
                <div className="mt-4">
                    {
                        isAdding && <div className="grid gap-1 w-1/2 max-w-96 mt-1">
                            <hr className="bg-slate-100 border border-blue-600 rounded-full"/>

                            <Label htmlFor="email">classify</Label>
                            <Input type="email" id="classify" onChange={(e) => {
                                bookMark.classify = e.target.value
                            }}/>
                            <Label htmlFor="email">name</Label>
                            <Input type="email" id="name" onChange={(e) => {
                                bookMark.name = e.target.value
                            }}/>
                            <Label htmlFor="email">tips</Label>
                            <Input type="email" id="tips" onChange={(e) => {
                                bookMark.tips = e.target.value
                            }}/>
                            <Label htmlFor="email">url</Label>
                            <Input type="email" id="url" onChange={(e) => {
                                bookMark.url = e.target.value
                            }}/>
                            <Button type="submit" className="bg-blue-600" onClick={handleAddBookmarkBtn}>Add</Button>
                        </div>
                    }
                </div>

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
             onClick={() => openInNewTa(link)}>
            <div className="ml-2 mt-1 text-lg text-blue-600">
                {title}
            </div>
            <p className="ml-1 line-clamp-2 text-sm/normal">{tips}</p>
        </div>
    )
}
