import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";

interface FilterDropdownProps {
  value: string;
  setter: (value: string) => void;
  options: { name: string }[];
  label: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ value, setter, options, label }) => (
  <div className="flex-1 min-w-0">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
        >
          <span className="truncate">
            {label}: {value}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50 ml-2 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800 border border-gray-700 text-gray-300">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.name}
            onSelect={() => setter(option.name)}
            className="hover:bg-gray-700"
          >
            <span className="truncate">{option.name}</span>
            {value === option.name && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export default FilterDropdown;
