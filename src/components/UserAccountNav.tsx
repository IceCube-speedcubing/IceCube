"use client";

import { User, ShieldCheck, Settings, LogOut, CreditCard } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const HoverMenuItem = ({
  children,
  icon: Icon,
  isSignOut = false,
}: {
  children: React.ReactNode;
  icon: React.ComponentType<any>;
  isSignOut?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-md transition-all duration-300 ease-in-out"
    >
      <div
        className={`absolute inset-0 ${
          isSignOut
            ? "bg-gradient-to-r from-red-600 via-red-500 to-red-700"
            : "bg-gradient-to-r from-blue-500 to-purple-500"
        } opacity-0 transition-opacity duration-300`}
        style={{ opacity: isHovered ? 1 : 0 }}
      />
      <div className="relative flex items-center px-4 py-2 text-sm">
        <Icon
          className={`mr-2 h-4 w-4 transition-all duration-300 ${
            isHovered ? "text-white" : "text-gray-400"
          }`}
        />
        <span
          className={`transition-all duration-300 ${
            isHovered ? "text-white translate-x-1" : "text-gray-200"
          }`}
        >
          {children}
        </span>
      </div>
    </div>
  );
};

interface UserType {
  name: string;
  email: string;
  image: string;
  isAdmin: boolean;
}

export function UserAccountNav({ user }: { user: UserType }) {
  const auth = useAuth();

  const handleSignOut = () => {
    auth?.logout();
    window.location.href = "/auth/login";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none group">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-75 blur-md transition-all duration-300 ease-in-out"></div>
          <Avatar className="relative w-10 h-10 transition-all duration-300 ease-in-out group-hover:scale-105 border-2 border-transparent group-hover:border-blue-400">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="bg-black bg-opacity-50 backdrop-blur-md">
              <User className="h-5 w-5 text-white" />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 bg-gray-900 bg-opacity-95 backdrop-blur-xl border border-gray-800 text-white rounded-xl overflow-hidden shadow-2xl animate-in slide-in-from-top-5 duration-300"
      >
        <div className="px-4 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            {user.isAdmin && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
                <ShieldCheck className="w-3 h-3 mr-1" />
                Admin
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1 truncate">{user.email}</p>
        </div>
        <DropdownMenuSeparator className="bg-gray-800" />
        <div className="py-1">
          {user.isAdmin && (
            <DropdownMenuItem asChild>
              <HoverMenuItem icon={ShieldCheck}>
                <Link href="/admin/dashboard" className="w-full">
                  Admin Dashboard
                </Link>
              </HoverMenuItem>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <HoverMenuItem icon={User}>
              <Link href="/profile" className="w-full">
                Profile
              </Link>
            </HoverMenuItem>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <HoverMenuItem icon={Settings}>
              <Link href="/settings" className="w-full">
                Settings
              </Link>
            </HoverMenuItem>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <HoverMenuItem icon={CreditCard}>
              <Link href="/billing" className="w-full">
                Billing
              </Link>
            </HoverMenuItem>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator className="bg-gray-800" />
        <DropdownMenuItem asChild>
          <HoverMenuItem icon={LogOut} isSignOut={true}>
            <button className="w-full text-left" onClick={handleSignOut}>
              Sign out
            </button>
          </HoverMenuItem>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
