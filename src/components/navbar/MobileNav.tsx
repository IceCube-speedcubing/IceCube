"use client";

import { Button } from "@/components/ui/button";
import { NavItems } from "./NavItems";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-background md:hidden transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
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

      {/* Content */}
      <div className="flex flex-col p-4 space-y-6">
        {/* Navigation Items */}
        <NavItems 
          className="flex-col items-start space-y-4 space-x-0" 
          onItemClick={onClose}
        />

        {/* Auth Buttons */}
        <div className="flex flex-col w-full space-y-3 pt-6 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-center text-base font-medium text-foreground hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            onClick={onClose}
          >
            Sign In
          </Button>
          <Button 
            className="w-full justify-center text-base bg-gradient-to-r from-primary/90 to-primary text-primary-foreground font-medium shadow-md shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-200"
            onClick={onClose}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
} 