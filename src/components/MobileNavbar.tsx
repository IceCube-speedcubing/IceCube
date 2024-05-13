"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import UserAvatar from './UserAvatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = false;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <Button
        variant={'ghost'}
        className="flex items-center px-3 py-2 rounded text-gray-800 hover:text-gray-600"
        onClick={toggleMenu}
      >
        <Menu className="h-6 w-6" />
      </Button>
      {isOpen && (
        <div className="absolute z-10 left-0 w-full bg-white shadow-md mt-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/algs"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100"
            >
              Algs
            </Link>
            <Link
              href="/courses"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100"
            >
              Courses
            </Link>
            <Link
              href="/timer"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100"
            >
              Timer
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100"
            >
              About
            </Link>
            {user ? (
              <div className="px-3 py-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full hover:bg-gray-100">
                      <UserAvatar />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
              <div className='w-screen justify-center'>

              <Button
              variant={'ghost'}
              className='hover:bg-gray-100 hover:text-black'>
                <Link href="/sign-in">Sign In</Link>
              </Button>

              <Button
              variant={'ghost'}
              className='hover:bg-gray-100 hover:text-black'>
                <Link href="/sign-up">Create Account</Link>
              </Button>
                
                  </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
