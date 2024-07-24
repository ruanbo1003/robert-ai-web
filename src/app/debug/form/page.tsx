import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Page() {
    return (
        <div className="grid w-full mx-auto my-auto max-w-sm items-center gap-1 mt-20">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
            <Label htmlFor="email">name</Label>
            <Input type="email" id="email" placeholder="name" />
            <Label htmlFor="email">tips</Label>
            <Input type="email" id="email" placeholder="tips" />
            <Label htmlFor="email">url</Label>
            <Input type="email" id="email" placeholder="url" />
            <Button type="submit">Add</Button>
        </div>
    )
}
