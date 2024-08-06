"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserAccountNav } from "@/components/UserAccountNav";
import Image from "next/image";
import { MobileNav } from "@/components/MobileNav";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { name: "Algorithms", href: "/algs" },
  { name: "Courses", href: "/courses" },
  { name: "Timer", href: "/timer" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const auth = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trackNavigation = (path: string) => {
    console.log(`Navigated to: ${path}`);
  };

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black bg-opacity-50 backdrop-blur-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" onClick={() => trackNavigation("/")}>
            <Image
              src="/images/type-logo-w.png"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>

          <div className="hidden md:flex items-center justify-center flex-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    pathname === item.href ? "text-white" : ""
                  }`}
                  onClick={() => trackNavigation(item.href)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            {auth?.loading ? (
              <div>Loading...</div>
            ) : auth?.user ? (
              <UserAccountNav user={auth.user} />
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => trackNavigation("/auth/login")}
                >
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-[#0A4779] transition-colors duration-200"
                  >
                    Log In
                  </Button>
                </Link>
                <div className="w-px h-6 bg-gray-600 mx-2" />
                <Link
                  href="/auth/signup"
                  onClick={() => trackNavigation("/auth/signup")}
                >
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-[#0A4779] transition-colors duration-200"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
          <MobileNav isLoggedIn={!!auth?.user} user={auth?.user} />
        </div>
      </div>
    </nav>
  );
}
