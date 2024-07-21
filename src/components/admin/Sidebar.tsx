import Link from 'next/link';
import { Home, Users, BookOpen, BarChart2, Box } from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Courses', href: '/admin/courses', icon: BookOpen },
  { name: 'Algs', href: '/admin/algs', icon: Box },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
];

export function Sidebar() {
  return (
    <div className="bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg text-white w-64 h-full flex flex-col">
      <div className="p-6 flex items-center justify-center">
        <Image
          src="/images/IceCube-logo.png"
          alt="IceCube Logo"
          width={64}
          height={64}
          className="drop-shadow-glow"
        />
      </div>
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center py-3 px-4 rounded-lg transition-all duration-300 hover:bg-[#0A4779] hover:scale-105 group"
          >
            <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
