"use client";

import { NAV_CATEGORY } from "@/config";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Category = (typeof NAV_CATEGORY)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({ isAnyOpen, category, handleOpen, isOpen }: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5 font-bold"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {category.label}
          <ChevronDown
            className={cn("h-4 2-4 transition-all text-muted-foreground", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>

      {isOpen ? (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isOpen,
            }
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow"
            araia-hidden="true"
          />

          <div className="relative bg-white">
            <div className="mx-auto max-w-5xl px-8">
              <div className="grid grid-cols-5 gap-x-8 gap-y-10 py-16">
                <div className="col-span-4 col-start-1 grid grid-col-3 gap-x-8">
                  {category.featured.map((item) => (
                    <div
                      key={item.name}
                      className="group relative text-base sm:text-sm"
                    >
                      <Link href={item.href}>
                      <div className="relative aspect-auto overflow-hidden rounded-lg bg-gray-100 groupe-hover:opacity-75">
                        <Image
                          src={item.imgSrc}
                          alt="nav category image"
                          width={50}
                          height={50}
                          className="object-cover object-center"
                        />
                      </div>
                      </Link>

                      <Link href={item.href} className="mt-6 block font-medium text-gray-900">
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
