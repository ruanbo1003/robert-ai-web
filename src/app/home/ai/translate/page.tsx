
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator} from "@/components/ui/separator"


export default function Page() {
    return (
        <div className="flex flex-col h-5/6 w-1/2 justify-start mx-auto justify-items-start">
            <div className="mt-4 flex flex-col content-start">
                <h2 className="text-2xl font-semibold tracking-tight text-blue-500 text-left">
                    Translate
                </h2>
                <p className="text-sm text-muted-foreground mb-6 text-blue-400 text-left">
                    translate from English to Chinese, or Chinese to English.
                </p>
            </div>
            <Separator className="my-4" />

            {/*<div className="flex flex-col w-1/2 mx-auto justify-start">*/}
            <div className="grid w-full mt-3">
            <Label htmlFor="message" className="w-1/3 text-left ml-1 mb-1">Your input</Label>
                <Textarea placeholder="Type your message here." className="min-h-[100px] md:min-h-[200px] lg:min-h[300px]"/>
            </div>
            <div className="w-1/4 mt-3 left-0">
                <button className="bg-blue-500 text-white text-xl rounded-lg w-full">Translate</button>
            </div>
            <div className="grid w-full mt-3">
                <Label htmlFor="message" className="w-1/3 text-left ml-1 mb-1">Translate output</Label>
                <Textarea placeholder="" className="min-h-[100px] md:min-h-[200px] lg:min-h[300px]"/>
            </div>
        </div>
    );
}

