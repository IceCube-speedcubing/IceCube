"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Users,
  Book,
  LogOut,
  BookOpen,
  Box,
  BarChart2,
  CheckSquare,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { UserAccountNav } from "@/components/UserAccountNav";

export function AdminSidebar() {
  const pathname = usePathname();
  const auth = useAuth();

  const isActive = (path: string) => pathname.startsWith(path);

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: Home },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Courses", href: "/admin/courses", icon: BookOpen },
    { label: "Algs", href: "/admin/algs", icon: Box },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart2 },
    { label: "Todo", href: "/admin/todo", icon: CheckSquare },
  ];

  return (
    <aside className="bg-black bg-opacity-40 backdrop-blur-md text-white w-64 min-h-screen p-6 z-50 relative flex flex-col shadow-xl border-r border-gray-800">
      <div className="mb-12 flex justify-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/IceCube-logo.png"
            alt="IceCube Logo"
            width={80}
            height={80}
            className="transition-transform duration-300 hover:scale-110"
          />
        </Link>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-4">
          {navItems.map(({ href, icon: Icon, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                  isActive(href)
                    ? "bg-[#0A4779] text-white shadow-lg"
                    : "text-gray-300 hover:bg-[#083A61] hover:text-white"
                }`}
              >
                <Icon className="mr-4" size={20} />
                <span className="font-medium">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-8">
        <div className="border-t border-gray-700 pt-6 mb-6 flex justify-center">
          <UserAccountNav user={auth.user} />
        </div>
        <Link
          href="/auth/logout"
          className="flex items-center justify-center p-3 rounded-lg text-gray-300 hover:bg-[#0A4779] hover:text-white transition-all duration-300 group"
        >
          <LogOut
            className="mr-3 group-hover:rotate-12 transition-transform duration-300"
            size={20}
          />
          <span className="font-medium">Log Out</span>
        </Link>
      </div>
    </aside>
  );
}
