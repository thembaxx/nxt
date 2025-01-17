"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserContext } from "@/context/user-context";
import { getInitials } from "@/lib/utils";

function Navbar() {
  const userContext = useUserContext();
  const user = userContext?.user;

  return (
    <div className="h-full w-full flex items-center justify-between">
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
        <Button size="icon" variant="ghost" className="relative p-0">
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
  );
}

export default Navbar;
