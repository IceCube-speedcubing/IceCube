'use client'


import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Link from "next/link"
import { sign } from "crypto"
import { CircleUser } from "lucide-react"
import UserAvatar from "./UserAvatar"



const UserAccountNav = () => {

    const user = "admin"
    const isAdmin = user === "admin"
    
 
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="overflow-visible">
                <Button variant='ghost' size='sm' className="relative hover:bg-white">
                    <UserAvatar />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white w-60 dark:bg-[#002d4a]" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5 leading-none">
                        <p className="font-bold text-dm">
                            Username
                        </p>
                    </div>
                </div>

                <DropdownMenuSeparator className="h-0.5 bg-gray-300 dark:bg-[#00406C]" />

                <DropdownMenuItem asChild>
                    <Link href="/settings/general">Settings</Link>
                </DropdownMenuItem>

                {isAdmin && (
                    <>
                    <DropdownMenuSeparator />
                        
                        <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                    </>
                )}

                <DropdownMenuItem className="cursor-pointer">
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAccountNav