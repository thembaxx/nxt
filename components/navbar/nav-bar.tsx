"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserContext } from "@/context/user-context";
import { getInitials } from "@/lib/utils";
import MenuPopover from "./menu-popover";
import { useState } from "react";
import clsx from "clsx";

function Navbar() {
  const userContext = useUserContext();
  const user = userContext?.user;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full sticky top-0">
      <div
        className={clsx(
          "px-4 w-full flex items-center overflow-hidden justify-between h-14 rounded-2xl shadow-lg bg-neutral-800/90 backdrop-blur-sm",
          menuOpen && "rounded-b-none"
        )}
      >
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.svg"
            alt="NXT logo"
            width={24}
            loading="eager"
            height={24}
            className=""
          />
          <p className="font-mono font-bold text-neutral-200">NXT</p>
        </div>

        <div className="flex items-center space-x-4">
          {user && (
            <Avatar className="h-8 w-8">
              {user.image && <AvatarImage src={user.image} />}
              <AvatarFallback className="text-[11px]">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          )}

          <Button
            size="icon"
            variant="ghost"
            className="relative p-0"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Image
              src="/icons/menu-01-stroke-rounded.svg"
              alt="Menu"
              width={20}
              loading="eager"
              height={20}
            />
          </Button>
        </div>
      </div>
      {menuOpen && (
        <div className="relative bg-neutral-800/90 backdrop-blur-sm w-full -mt-px z-10 overflow-hidden rounded-b-2xl shadow-lg">
          <MenuPopover user={user} open={menuOpen} setOpen={setMenuOpen} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
