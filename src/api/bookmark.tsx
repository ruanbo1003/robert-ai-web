'use client';

import { FetchApi } from "@/api/fetch"


export interface BookmarkItem {
    classify: string,
    name: string,
    tips: string,
    url: string,
}


export function BookmarkApi() {

    return {
        GetClassifyList,
        Add,
    }

    function GetClassifyList() {
        return FetchApi().get('/api/bookmark/classify')
    }

    function Add(payload: BookmarkItem) {
        return FetchApi().post('/api/bookmark/add', payload)
    }

}
