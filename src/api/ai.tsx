
'use client';

import { FetchApi } from "@/api/fetch"


export interface AiTranslateReq {
    model: string,
    content: string,
}


export function AiApi() {
    return {
        Translate,
    }

    function Translate(content: string) {
        const payload: AiTranslateReq = {
            model: "",
            content: content
        }
        return FetchApi().post('/api/ai/translate', payload)
    }

}
