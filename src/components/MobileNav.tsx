"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { UserAccountNav } from "@/components/UserAccountNav";

const navItems = [
  { name: "Algorithms", href: "/algs" },
  { name: "Courses", href: "/courses" },
  { name: "Timer", href: "/timer" },
  { name: "About", href: "/about" },
];

interface MobileNavProps {
  isLoggedIn: boolean;
  user: any;
}

export function MobileNav({ isLoggedIn, user }: MobileNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <Menu className="block h-6 w-6" aria-hidden="true" />
      </button>

      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <nav
          className={`absolute top-0 right-0 bottom-0 w-64 py-6 px-6 bg-gray-900 bg-opacity-80 backdrop-blur-md overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Menu</h2>
            <button
              className="text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-lg text-gray-300 hover:text-white transition-colors duration-150 ease-in-out"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            {isLoggedIn ? (
              <div className="flex justify-center py-3">
                <UserAccountNav user={user} />
              </div>
            ) : (
              <div className="space-y-4">
                <Link href="/auth/login" className="block w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Log In
                  </Button>
                </Link>
                <Link href="/auth/signup" className="block w-full">
                  <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
