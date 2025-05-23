"use client";

import { Button } from "@/components/ui/button";
import { NavItems } from "./NavItems";
import { X, LogOut, Settings, User, User2, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useScrollLock } from '@/hooks/useScrollLock';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

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
  const [mounted, setMounted] = useState(false);
  useScrollLock(isOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
    <div
      className={cn(
          "fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden transition-all duration-300 z-[90]",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
        onClick={onClose}
      />
      
      {/* Mobile Nav Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white/3 dark:bg-black/5 backdrop-blur-[40px] border-l border-blue-200/15 dark:border-blue-400/20 md:hidden transition-all duration-300 ease-out z-[100] shadow-2xl",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          backdropFilter: "blur(40px) saturate(120%)",
          WebkitBackdropFilter: "blur(40px) saturate(120%)"
        }}
      >
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/3 via-transparent to-blue-100/2 dark:from-blue-500/2 dark:to-blue-400/1 pointer-events-none" />
          
        {/* Header */}
          <div className={cn(
            "flex items-center justify-between h-16 px-6 border-b border-blue-200/10 dark:border-blue-300/15 relative z-10 transition-all duration-500 delay-100 bg-white/2 dark:bg-white/2",
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-foreground">
                IceCube
              </span>
            </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
              className="h-10 w-10 rounded-full hover:bg-blue-50/10 dark:hover:bg-blue-500/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            aria-label="Close mobile menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto relative z-10">
          <div className="flex flex-col p-4 space-y-6">
            {/* Navigation Items */}
              <div className={cn(
                "transition-all duration-700 delay-200",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}>
            <NavItems 
                  className="flex-col items-start space-y-1 space-x-0" 
              onItemClick={onClose}
            />
              </div>

              {/* Auth Section */}
              <div className={cn(
                "transition-all duration-700 delay-300",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}>
              {isLoggedIn ? (
                  <div className="space-y-4">
                    {/* User Profile Card */}
                    <div className="bg-white/2 dark:bg-white/2 rounded-2xl p-4 border border-blue-200/15 dark:border-blue-300/20 backdrop-blur-sm shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="relative group">
                          <Avatar className="h-12 w-12 ring-1 ring-blue-200/20 dark:ring-blue-300/25 shadow-lg shadow-blue-500/5 transition-all duration-300 group-hover:scale-105 group-hover:ring-blue-300/30 dark:group-hover:ring-blue-400/35">
                            <AvatarImage src={user.image} alt={user.name} className="object-cover transition-transform duration-300 group-hover:scale-110" />
                            <AvatarFallback className="bg-white/8 dark:bg-white/8 text-foreground font-bold backdrop-blur-sm transition-all duration-300 group-hover:bg-white/12">
                              <User2 className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                      </AvatarFallback>
                    </Avatar>
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="font-bold text-base text-foreground truncate transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400">{user.name}</h3>
                        {isAdmin && (
                              <Badge className="text-[9px] px-1.5 py-0 bg-blue-500/10 dark:bg-blue-400/15 text-blue-600 dark:text-blue-400 border-blue-300/25 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-blue-500/15 dark:hover:bg-blue-400/20">
                            Admin
                          </Badge>
                        )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate font-medium transition-colors duration-200 hover:text-foreground">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-2">
                      <Link 
                        href="/profile" 
                        onClick={onClose}
                        className="group cursor-pointer w-full rounded-xl h-12 flex items-center px-3 hover:bg-blue-50/8 dark:hover:bg-blue-500/8 transition-all duration-300 text-sm relative overflow-hidden backdrop-blur-sm hover:scale-[1.02] hover:-translate-y-0.5 border border-blue-200/0 hover:border-blue-300/20 dark:hover:border-blue-400/25"
                      >
                        <div className="absolute inset-0 bg-blue-100/0 group-hover:bg-blue-100/3 dark:group-hover:bg-blue-400/3 transition-all duration-300" />
                        
                        <div className="relative flex items-center w-full">
                          <div className="p-2 rounded-lg bg-blue-100/12 dark:bg-blue-500/12 text-foreground group-hover:bg-blue-200/15 dark:group-hover:bg-blue-400/15 transition-all duration-300 mr-3 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3">
                            <User className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-foreground text-sm transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">Profile</span>
                            <p className="text-[10px] text-muted-foreground transition-all duration-200 group-hover:text-blue-500/70 dark:group-hover:text-blue-400/70">Manage account</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300 group-hover:scale-110" />
                        </div>
                      </Link>

                      <Link 
                        href="/settings" 
                        onClick={onClose}
                        className="group cursor-pointer w-full rounded-xl h-12 flex items-center px-3 hover:bg-blue-50/8 dark:hover:bg-blue-500/8 transition-all duration-300 text-sm relative overflow-hidden backdrop-blur-sm hover:scale-[1.02] hover:-translate-y-0.5 border border-blue-200/0 hover:border-blue-300/20 dark:hover:border-blue-400/25"
                      >
                        <div className="absolute inset-0 bg-blue-100/0 group-hover:bg-blue-100/3 dark:group-hover:bg-blue-400/3 transition-all duration-300" />
                        
                        <div className="relative flex items-center w-full">
                          <div className="p-2 rounded-lg bg-blue-100/12 dark:bg-blue-500/12 text-foreground group-hover:bg-blue-200/15 dark:group-hover:bg-blue-400/15 transition-all duration-300 mr-3 backdrop-blur-sm group-hover:scale-110 group-hover:-rotate-3">
                            <Settings className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-foreground text-sm transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">Settings</span>
                            <p className="text-[10px] text-muted-foreground transition-all duration-200 group-hover:text-blue-500/70 dark:group-hover:text-blue-400/70">Preferences</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300 group-hover:scale-110" />
                        </div>
                      </Link>

                      <button 
                        onClick={onClose}
                        className="group text-foreground hover:text-red-600 dark:hover:text-red-400 cursor-pointer w-full rounded-xl h-12 flex items-center px-3 hover:bg-red-50/8 dark:hover:bg-red-500/8 transition-all duration-300 text-sm relative overflow-hidden backdrop-blur-sm hover:scale-[1.02] hover:-translate-y-0.5 border border-red-200/0 hover:border-red-300/20 dark:hover:border-red-400/25"
                      >
                        <div className="absolute inset-0 bg-red-100/0 group-hover:bg-red-100/3 dark:group-hover:bg-red-400/3 transition-all duration-300" />
                        
                        <div className="relative flex items-center w-full">
                          <div className="p-2 rounded-lg bg-red-100/12 dark:bg-red-500/12 text-foreground group-hover:bg-red-200/15 dark:group-hover:bg-red-400/15 group-hover:text-red-600 dark:group-hover:text-red-400 transition-all duration-300 mr-3 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-6">
                            <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-x-1" />
                          </div>
                          <div className="flex-1 text-left">
                            <span className="font-semibold text-sm transition-colors duration-200 group-hover:text-red-600 dark:group-hover:text-red-400">Sign out</span>
                            <p className="text-[10px] text-muted-foreground group-hover:text-red-500/70 dark:group-hover:text-red-400/70 transition-all duration-200">End session</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-300 group-hover:scale-110" />
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-center bg-white/2 dark:bg-white/2 rounded-xl p-4 border border-blue-200/10 dark:border-blue-300/15 backdrop-blur-sm">
                      <h3 className="text-base font-semibold mb-1 text-foreground">Welcome to IceCube</h3>
                      <p className="text-xs text-muted-foreground">Join us to get started</p>
                </div>
                    
                  <Button 
                      variant="outline" 
                      className="w-full h-10 justify-center text-sm font-medium rounded-xl border-2 border-blue-200/20 dark:border-blue-400/25 hover:bg-blue-50/8 dark:hover:bg-blue-500/8 transition-all duration-300 hover:scale-[1.02] hover:border-blue-300/30 dark:hover:border-blue-400/35 backdrop-blur-sm"
                    onClick={onClose}
                    asChild
                  >
                      <Link href="/auth/login">
                      Log In
                    </Link>
                  </Button>
                    
                  <Button 
                      className="w-full h-10 justify-center text-sm font-medium rounded-xl bg-gradient-to-r from-blue-500/80 via-blue-600/80 to-blue-500/70 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group backdrop-blur-sm"
                    onClick={onClose}
                    asChild
                  >
                    <Link href="/auth/signup">
                        <span className="relative z-10">Get Started</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </Link>
                  </Button>
                  </div>
              )}
              </div>
            </div>
          </div>

          {/* Bottom glass accent */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
        </div>
      </div>
    </>
  );
} 