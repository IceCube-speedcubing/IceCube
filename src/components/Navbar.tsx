"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserAccountNav } from "@/components/UserAccountNav";
import Image from "next/image";
import { MobileNav } from "@/components/MobileNav";

// TODO: Consider moving this to a separate configuration file
const navItems = [
  { name: "Algorithms", href: "/algs" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // TODO: Implement a custom hook for scroll handling to improve reusability

  const isLoggedIn = true; // TODO: Replace with actual auth check

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black bg-opacity-50 backdrop-blur-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <Image
              src="/images/type-logo-w.png"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>

          <div className="hidden md:flex items-center justify-center flex-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <UserAccountNav />
            ) : (
              <>
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    className="text-white hover:text-[#0A4779] transition-colors duration-300"
                  >
                    Log In
                  </Button>
                </Link>
                <div className="w-px h-6 bg-gray-400 mx-2" />
                <Link href="/auth/signup">
                  <Button
                    variant="ghost"
                    className="text-white hover:text-[#0A4779] transition-colors duration-300"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <MobileNav isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </nav>
  );
}

// TODO: Implement active link styling
// TODO: Add dropdown menus for more complex navigation structures
// TODO: Implement internationalization (i18n) for multi-language support
// TODO: Add accessibility features (e.g., aria-labels, keyboard navigation)
// TODO: Implement a dark/light mode toggle
// TODO: Add animations for navbar items on page load
// TODO: Optimize performance using React.memo or useMemo where appropriate
// TODO: Implement analytics tracking for navigation interactions
// TODO: Add unit and integration tests for the Navbar component
// TODO: Consider implementing a search functionality in the navbar
// TODO: Add support for dynamic navigation items (e.g., fetched from an API)
