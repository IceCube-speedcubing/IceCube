import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { UserRound } from "lucide-react"

const UserAvatar = ()  => {
    return (
        <Avatar className="w-10 h-10 m-0.5">
      <AvatarImage src="https://github.com/shadcn.png" alt="user avatar" />
      <AvatarFallback><UserRound /></AvatarFallback>
    </Avatar>
    )
}

export default UserAvatar