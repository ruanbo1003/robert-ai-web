'use client';

import { FetchApi } from "@/api/fetch"


export interface NewBookmarkItem {
    classify: string,
    name: string,
    tips: string,
    url: string,
}


export interface BookmarkItem {
    name: string,
    tips: string,
    url: string,
}

export interface BookmarkListResp {
    classify: [string],
    bookmarks: Record<string, BookmarkItem>
}


export function BookmarkApi() {

    return {
        GetBookmarks,
        GetClassifyList,
        Add,
    }

    function GetBookmarks() {
        return FetchApi().get('/api/bookmark/list')
    }

    function GetClassifyList() {
        return FetchApi().get('/api/bookmark/classify')
    }

    function Add(payload: NewBookmarkItem) {
        return FetchApi().post('/api/bookmark/add', payload)
    }

}
