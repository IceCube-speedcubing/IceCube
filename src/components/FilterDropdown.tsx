import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";
import { Label } from "./ui/label";

interface FilterDropdownProps {
  value: string;
  setter: (value: string) => void;
  options: { name: string }[];
  label: string;
}

const FilterDropdown = ({
  value,
  setter,
  options,
  label,
}: FilterDropdownProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-medium text-gray-300">{label}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between bg-gray-800 border-gray-700 text-gray-300"
          >
            {value || `Select ${label}`}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 border border-gray-700 text-gray-300">
          {options && options.length > 0 ? (
            options.map((option) => (
              <DropdownMenuItem
                key={option.name}
                onSelect={() => setter(option.name)}
                className="cursor-pointer hover:bg-gray-700"
              >
                {option.name}
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled>No options available</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterDropdown;
