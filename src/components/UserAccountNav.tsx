"use client";

import { User, ShieldCheck, Settings, LogOut, CreditCard } from "lucide-react";
import { signOut } from "next-auth/react";
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

// TODO: Replace this with actual user data fetching
const user = {
  name: "John Doe",
  email: "john@example.com",
  image: "https://github.com/shadcn.png",
  isAdmin: true, // TODO: Replace with actual admin check
};

// TODO: Consider moving this component to a separate file if it grows in complexity
const HoverMenuItem = ({ children, icon: Icon }: { children: React.ReactNode, icon: React.ComponentType<any> }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-md transition-all duration-300 ease-in-out"
      style={{
        backgroundColor: isHovered ? "rgba(255, 255, 255, 0.1)" : "transparent",
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300"
        style={{ opacity: isHovered ? 0.15 : 0 }}
      />
      <div className="relative flex items-center px-4 py-2 text-sm">
        <Icon className={`mr-2 h-4 w-4 transition-all duration-300 ${isHovered ? 'text-blue-400' : 'text-gray-400'}`} />
        <span className={`transition-all duration-300 ${isHovered ? 'text-white translate-x-1' : 'text-gray-200'}`}>
          {children}
        </span>
      </div>
    </div>
  );
};

export function UserAccountNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none group">
        <div className="relative w-10 h-10">
          {/* TODO: Customize the glow effect colors to match your brand */}
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
          {/* TODO: Implement proper routing for these links */}
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
          <HoverMenuItem icon={LogOut}>
            <button
              className="w-full text-left"
              onClick={(event) => {
                event.preventDefault();
                // TODO: Implement proper sign out logic
                signOut({
                  callbackUrl: `${window.location.origin}/login`,
                });
              }}
            >
              Sign out
            </button>
          </HoverMenuItem>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// TODO: Add proper type checking for props and return types
// TODO: Consider adding tests for this component
// TODO: Optimize performance if needed (e.g., memoization)
