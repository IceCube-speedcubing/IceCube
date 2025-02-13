"use client";

import { Button } from "@/components/ui/button";
import { NavItems } from "./NavItems";
import { X, LogOut, Settings, User, User2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useScrollLock } from '@/hooks/useScrollLock';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  isAdmin?: boolean;
  user?: {
    name: string;
    email: string;
    image?: string;
  };
}

export function MobileNav({ isOpen, onClose, isLoggedIn, isAdmin, user = { name: "User Name", email: "user@example.com" } }: MobileNavProps) {
  useScrollLock(isOpen);

  return (
    <div
      className={cn(
        "fixed inset-0 bg-background md:hidden transition-opacity duration-300 z-[100]",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="font-bold text-xl">Logo</div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            aria-label="Close mobile menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col p-4 space-y-6">
            {/* Navigation Items */}
            <NavItems 
              className="flex-col items-start space-y-4 space-x-0" 
              onItemClick={onClose}
            />

            {/* Auth Buttons */}
            <div className="flex flex-col w-full space-y-3 pt-6 border-t">
              {isLoggedIn ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-3 px-2">
                    <Avatar>
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>
                        <User2 />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{user.name}</span>
                        {isAdmin && (
                          <Badge variant="secondary" className="text-[10px] px-1 py-0">
                            Admin
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/profile" onClick={onClose}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/settings" onClick={onClose}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-center text-base font-medium text-foreground hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                    onClick={onClose}
                    asChild
                  >
                    <Link href="/auth/signin">
                      Sign In
                    </Link>
                  </Button>
                  <Button 
                    className="w-full justify-center text-base bg-gradient-to-r from-primary/90 to-primary text-primary-foreground font-medium shadow-md shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-200"
                    onClick={onClose}
                    asChild
                  >
                    <Link href="/auth/signup">
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 