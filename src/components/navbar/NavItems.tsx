import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const navItems = [
  // { name: "Algorithms", href: "/algorithms" },
  { name: "Timer", href: "/timer" },
  { name: "About", href: "/about" },
];

interface NavItemsProps {
  className?: string;
  onItemClick?: () => void;
}

export function NavItems({ className, onItemClick }: NavItemsProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center space-x-8", className)}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={onItemClick}
          className={cn(
            "text-[15px] font-medium transition-all relative py-2",
            "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full",
            pathname === item.href
              ? "after:w-full text-foreground"
              : "text-foreground/80 hover:text-foreground"
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}