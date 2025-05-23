"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User, User2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface UserNavProps {
  user?: {
    name: string;
    email: string;
    image?: string;
  };
  isAdmin?: boolean;
}

export function UserNav({ user = { name: "User Name", email: "user@example.com" }, isAdmin = false }: UserNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 12,
        right: window.innerWidth - rect.right
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + 12,
          right: window.innerWidth - rect.right
        });
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isOpen]);

  const DropdownContent = () => (
    <div
      ref={dropdownRef}
      className={cn(
        "fixed w-72 bg-white/3 dark:bg-black/5 backdrop-blur-[40px] border border-blue-200/15 dark:border-blue-400/20 rounded-3xl shadow-2xl z-[9999] transition-all duration-300 transform-gpu overflow-hidden",
        isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
      )}
      style={{
        top: position.top,
        right: position.right,
        transformOrigin: "top right",
        backdropFilter: "blur(40px) saturate(120%)",
        WebkitBackdropFilter: "blur(40px) saturate(120%)",
        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.08), 0 0 0 1px rgba(59, 130, 246, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
      }}
    >
      {/* Subtle glass overlay with blue accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/3 via-transparent to-blue-100/2 dark:from-blue-500/2 dark:to-blue-400/1 pointer-events-none" />
      
      {/* User Info Header */}
      <div className="relative p-6 bg-white/2 dark:bg-white/2 border-b border-blue-200/10 dark:border-blue-300/15">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Avatar className="h-16 w-16 ring-1 ring-blue-200/20 dark:ring-blue-300/25 ring-offset-0 shadow-xl shadow-blue-500/5 transition-all duration-300 group-hover:scale-105 group-hover:ring-blue-300/30 dark:group-hover:ring-blue-400/35">
              <AvatarImage src={user.image} alt={user.name} className="object-cover transition-transform duration-300 group-hover:scale-110" />
              <AvatarFallback className="bg-white/8 dark:bg-white/8 text-foreground text-xl font-bold backdrop-blur-sm transition-all duration-300 group-hover:bg-white/12">
                <User2 className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col space-y-1 leading-none min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg text-foreground truncate transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400">{user.name}</h3>
              {isAdmin && (
                <Badge className="text-[10px] px-2 py-0.5 bg-blue-500/10 dark:bg-blue-400/15 text-blue-600 dark:text-blue-400 border-blue-300/25 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-blue-500/15 dark:hover:bg-blue-400/20">
                  Admin
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate font-medium transition-colors duration-200 hover:text-foreground">
              {user.email}
            </p>
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="p-3 space-y-2">
        <Link 
          href="/profile" 
          className="group cursor-pointer w-full rounded-2xl h-14 flex items-center px-4 hover:bg-blue-50/8 dark:hover:bg-blue-500/8 transition-all duration-300 text-sm relative overflow-hidden backdrop-blur-sm hover:scale-[1.02] hover:-translate-y-0.5"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-blue-100/0 group-hover:bg-blue-100/3 dark:group-hover:bg-blue-400/3 transition-all duration-300" />
          <div className="absolute inset-0 rounded-2xl border border-blue-200/0 group-hover:border-blue-300/20 dark:group-hover:border-blue-400/25 transition-all duration-300" />
          
          <div className="relative flex items-center w-full">
            <div className="p-3 rounded-xl bg-blue-100/12 dark:bg-blue-500/12 text-foreground group-hover:bg-blue-200/15 dark:group-hover:bg-blue-400/15 transition-all duration-300 mr-4 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3">
              <User className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            </div>
            <div className="flex-1">
              <span className="font-semibold text-foreground text-base transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">Profile</span>
              <p className="text-xs text-muted-foreground mt-0.5 transition-all duration-200 group-hover:text-blue-500/70 dark:group-hover:text-blue-400/70">Manage your account</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300 group-hover:scale-110" />
          </div>
        </Link>

        <Link 
          href="/settings" 
          className="group cursor-pointer w-full rounded-2xl h-14 flex items-center px-4 hover:bg-blue-50/8 dark:hover:bg-blue-500/8 transition-all duration-300 text-sm relative overflow-hidden backdrop-blur-sm hover:scale-[1.02] hover:-translate-y-0.5"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-blue-100/0 group-hover:bg-blue-100/3 dark:group-hover:bg-blue-400/3 transition-all duration-300" />
          <div className="absolute inset-0 rounded-2xl border border-blue-200/0 group-hover:border-blue-300/20 dark:group-hover:border-blue-400/25 transition-all duration-300" />
          
          <div className="relative flex items-center w-full">
            <div className="p-3 rounded-xl bg-blue-100/12 dark:bg-blue-500/12 text-foreground group-hover:bg-blue-200/15 dark:group-hover:bg-blue-400/15 transition-all duration-300 mr-4 backdrop-blur-sm group-hover:scale-110 group-hover:-rotate-3">
              <Settings className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
            </div>
            <div className="flex-1">
              <span className="font-semibold text-foreground text-base transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">Settings</span>
              <p className="text-xs text-muted-foreground mt-0.5 transition-all duration-200 group-hover:text-blue-500/70 dark:group-hover:text-blue-400/70">Preferences & privacy</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300 group-hover:scale-110" />
          </div>
        </Link>
      </div>
      
      {/* Glass divider with blue accent */}
      <div className="mx-6 my-3 h-px bg-gradient-to-r from-transparent via-blue-200/15 dark:via-blue-300/20 to-transparent" />
      
      {/* Logout Section */}
      <div className="p-3 pb-4">
        <button 
          className="group text-foreground hover:text-red-600 dark:hover:text-red-400 cursor-pointer w-full rounded-2xl h-14 flex items-center px-4 hover:bg-red-50/8 dark:hover:bg-red-500/8 transition-all duration-300 text-sm relative overflow-hidden backdrop-blur-sm hover:scale-[1.02] hover:-translate-y-0.5"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-red-100/0 group-hover:bg-red-100/3 dark:group-hover:bg-red-400/3 transition-all duration-300" />
          <div className="absolute inset-0 rounded-2xl border border-red-200/0 group-hover:border-red-300/20 dark:group-hover:border-red-400/25 transition-all duration-300" />
          
          <div className="relative flex items-center w-full">
            <div className="p-3 rounded-xl bg-red-100/12 dark:bg-red-500/12 text-foreground group-hover:bg-red-200/15 dark:group-hover:bg-red-400/15 group-hover:text-red-600 dark:group-hover:text-red-400 transition-all duration-300 mr-4 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-6">
              <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-x-1" />
            </div>
            <div className="flex-1 text-left">
              <span className="font-semibold text-base transition-colors duration-200 group-hover:text-red-600 dark:group-hover:text-red-400">Sign out</span>
              <p className="text-xs text-muted-foreground group-hover:text-red-500/70 dark:group-hover:text-red-400/70 mt-0.5 transition-all duration-200">End your session</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-300 group-hover:scale-110" />
          </div>
        </button>
      </div>

      {/* Bottom blue accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
    </div>
  );

  return (
    <>
      <Button 
        ref={buttonRef}
        variant="ghost" 
        className={cn(
          "relative h-11 w-11 rounded-full hover:bg-blue-50/10 dark:hover:bg-blue-500/10 transition-all duration-300 backdrop-blur-sm hover:scale-105",
          isOpen && "bg-blue-100/10 dark:bg-blue-500/10 ring-1 ring-blue-300/20 dark:ring-blue-400/25 scale-105"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative">
          <Avatar className="h-10 w-10 ring-1 ring-blue-200/15 dark:ring-blue-300/20 transition-all duration-300 hover:ring-blue-300/25 dark:hover:ring-blue-400/30 hover:scale-105">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="bg-white/8 dark:bg-white/8 text-foreground backdrop-blur-sm">
              <User2 className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </Button>
      
      {mounted && createPortal(<DropdownContent />, document.body)}
    </>
  );
} 