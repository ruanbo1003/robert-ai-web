
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

    function Translate(model: string, content: string) {
        const payload: AiTranslateReq = {
            model: model,
            content: content
        }
        console.log("payload:", payload)

        return FetchApi().post('/api/ai/translate', payload)
    }

}
