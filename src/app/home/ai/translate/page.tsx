'use client';

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator} from "@/components/ui/separator"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { AiApi } from "@/api/ai"


export default function Page() {
    const [inputContent, setInputContent] = useState("")
    const [outputContent, setOutputContent] = useState("")
    const [isTranslating, setIsTranslating] = useState(false)

    const { mutate: aiTranslateFn, isPending: isTranslatePending } = useMutation({
        mutationFn: (content: string) => AiApi().Translate(content),
        onSuccess: (data: string) => {
            console.log('translate success:', data, isTranslatePending)
            setIsTranslating(false)
            setOutputContent(data)
        },
        onError: (error) => {
            console.log('translate failed:', error)
        }
    })

    const handleTranslateBtn = (event) => {
        event.preventDefault();

        if(!inputContent) {
            return
        }

        setOutputContent("")
        setIsTranslating(true)
        aiTranslateFn(inputContent);
    }

    return (
        <div className="flex flex-col h-5/6 w-1/2 justify-start mx-auto justify-items-start">
            <div className="mt-6 flex flex-col content-start">
                <h2 className="text-2xl font-semibold tracking-tight text-blue-500 text-left">
                    Translate
                </h2>
                <p className="text-sm mb-6 text-black text-left">
                    translate from English to Chinese, or Chinese to English.
                </p>
            </div>
            <Separator className="mb-4"/>

            {/*<div className="flex flex-col w-1/2 mx-auto justify-start">*/}
            <div className="grid w-full mt-3">
            <Label htmlFor="message" className="w-1/3 text-left ml-1 mb-1">Your input</Label>
                <Textarea placeholder="Type your message here." onChange={e => setInputContent(e.target.value)} className="min-h-[100px] md:min-h-[200px] lg:min-h[300px]"/>
            </div>
            <div className="w-1/4 mt-3 left-0">
                <button onClick={handleTranslateBtn} disabled={isTranslating} className={ (isTranslating ? "bg-gray-500" : "bg-blue-500") + " text-white text-xl rounded-lg w-full" }>{isTranslating ? "Waiting": "Translate"}</button>
            </div>
            <div className="grid w-full mt-3">
                <Label htmlFor="message" className="w-1/3 text-left ml-1 mb-1">Translate output</Label>
                <Textarea placeholder="" value={outputContent} readOnly={true} className="min-h-[100px] md:min-h-[200px] lg:min-h[300px]"/>
            </div>
        </div>
    );
}

