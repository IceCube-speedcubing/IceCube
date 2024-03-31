"use client";

import { useState, useRef, useEffect } from "react";
import { NAV_CATEGORY } from "@/config";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { Button } from "./ui/button";
import Link from "next/link";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | Number>(null);

  const isAnyOpen = activeIndex !== null

  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if(e.key === "Escape") {
        setActiveIndex(null)
      }
    }

    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [])

  useOnClickOutside(navRef, () => setActiveIndex(null))

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {NAV_CATEGORY.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === 1) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        const isOpen = i === activeIndex;

        return (
          <NavItem
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={category.value}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
