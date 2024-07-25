'use client';

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMutation } from "@tanstack/react-query"
import { UserApi } from "@/api/user"
import { useCustomRedirect } from "@/app/components/RedirectTo"
import useUserStore from "@/store/user"


export default function NavUser() {
    const loginUser = useUserStore((state) => state)
    const { redirectTo } = useCustomRedirect();

    const { mutate: logoutFn } = useMutation({
        mutationFn: () => {
            return UserApi().Logout()
        },
        onSuccess: (data) => {
            localStorage.removeItem("authToken")
            // console.log('logout onSuccess')
            redirectTo('/login');
        },
        onError: (error) => {
            console.log('logout onError')
        }
    })
    const handleLogout = (event) => {
        event.preventDefault();

        logoutFn()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 px-1">
                    <Avatar className="h-8 w-8" >
                        <AvatarImage src="/icon.png" alt="@robert" className="w-full h-full"/>
                        <AvatarFallback>{loginUser.name}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{loginUser.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {loginUser.name}@gmail.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>
                    Log out
                    {/*<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>*/}
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    )
}
