"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import clsx from "clsx";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

function SearchInput() {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <div
        className={clsx(
          "h-16 rounded-2xl relative flex items-center overflow-hidden border bg-neutral-800 shadow-xl",
          focused ? "outline-2 outline-white/60" : ""
        )}
      >
        <Input
          placeholder="Search for workers..."
          className="border-none outline-none h-full hover:bg-none text-base pl-4 pt-6"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <label
          htmlFor="search-workers-input"
          className="flex items-center absolute top-0 left-4 pt-3 text-xs text-neutral-300 font-medium space-x-1"
        >
          <span>39 Springbok Lane, Kempville</span>
          <ChevronDown className="w-4 h-4" />
        </label>
        <div className="absolute z-10 right-4">
          <Image
            src="/icons/settings-05-stroke-rounded.svg"
            alt=""
            height={24}
            width={24}
            className="opacity-70"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
