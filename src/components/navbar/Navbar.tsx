"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavItems } from "./NavItems";
import { MobileNav } from "./MobileNav";
import { UserNav } from "./UserNav";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Add this for testing purposes
const isLoggedIn = false;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav when pathname changes
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  // Pages that should always have navbar background
  const pagesWithBackground = ["/timer"];
  const shouldHaveBackground = isScrolled || pagesWithBackground.includes(pathname);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-[99] transition-all duration-300",
        shouldHaveBackground && "bg-background/95 backdrop-blur-lg border-b border-border/30 shadow-lg supports-[backdrop-filter]:bg-background/80"
      )}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 shrink-0"
          >
            <Image src="/images/IceCube-logo.webp" alt="IceCube Logo" width={32} height={32} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <NavItems />
          </div>

          {/* Auth Buttons or User Avatar */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <UserNav isAdmin={true} user={{ name: "User Name", email: "user@example.com" }} />
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm font-medium text-foreground hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                  asChild
                >
                  <Link href="/auth/login">
                    Log In
                  </Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground font-medium shadow-md shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-200"
                  asChild
                >
                  <Link href="/auth/signup">
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        isLoggedIn={isLoggedIn}
        isAdmin={true}
      />
    </nav>
  );
}