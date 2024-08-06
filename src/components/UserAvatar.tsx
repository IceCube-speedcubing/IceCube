import React from "react";
import { User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  user: {
    image: string;
    name: string;
  };
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-75 blur-md transition-all duration-300 ease-in-out"></div>
      <Avatar className="relative w-10 h-10 transition-all duration-300 ease-in-out group-hover:scale-105 border-2 border-transparent group-hover:border-blue-400">
        <AvatarImage src={user.image} alt={user.name} />
        <AvatarFallback className="bg-black bg-opacity-50 backdrop-blur-md">
          <User className="h-5 w-5 text-white" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
