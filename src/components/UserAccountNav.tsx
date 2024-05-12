'use client'


import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Link from "next/link"
import { sign } from "crypto"
import { CircleUser } from "lucide-react"
import UserAvatar from "./UserAvatar"



const UserAccountNav = () => {

    const user = "admin"
    const admin = user === "admin" 
 
    return (<DropdownMenu>
        <DropdownMenuTrigger asChild className="overflow-visible">
            <Button variant='ghost' size='sm' className="relative hover:bg-white dark:hover:bg-[#020817]">
                <UserAvatar />
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white w-60 dark:bg-[#00406C]" align="end">
            <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-0.5 leading-none">
                    <p className="text-dm font-bold">
                        Username
                    </p>
                </div>
            </div>
            

            <DropdownMenuSeparator className="h-0.5 bg-gray-300 dark:bg-[#002E4E]" />

            <DropdownMenuItem asChild>
                <Link href="/settings/general" className="cursor-pointer dark:hover:bg-[#002137]">Settings</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer dark:hover:bg-[#002137]">Dashbord</Link>
            </DropdownMenuItem>

            <DropdownMenuItem  className="cursor-pointer dark:hover:bg-[#002137]">
                Log out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>)
}

export default UserAccountNav