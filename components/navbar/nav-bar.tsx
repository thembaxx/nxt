"use client";

import * as motion from "motion/react-client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import MenuPopover from "./menu-popover";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { User } from "@/lib/definitions";

function Navbar() {
  const session = authClient.useSession();
  const user = session?.data?.user as User;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full">
      <div
        className={clsx(
          "px-4 w-full relative z-50 flex items-center overflow-hidden justify-between h-14 rounded-2xl shadow-lg bg-neutral-800/90 backdrop-blur-sm",
          menuOpen && "rounded-b-none"
        )}
      >
        <Link href="/">
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.svg"
              alt="NXT logo"
              width={24}
              loading="eager"
              height={24}
              className=""
            />
            <p className="font-mono font-bold text-xs text-neutral-200">NXT</p>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          {user && !menuOpen && (
            <Avatar className="h-9 w-9">
              {user.image && <AvatarImage src={user.image} />}
              <AvatarFallback className="text-[11px] text-neutral-400 font-semibold bg-black/15">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          )}

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              size="icon"
              variant="ghost"
              className="relative p-0"
              aria-label="Menu button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {!menuOpen && (
                <Image
                  src="/icons/menu-09-stroke-rounded.svg"
                  alt="Menu"
                  width={20}
                  loading="eager"
                  height={20}
                />
              )}
              {menuOpen && (
                <Image
                  src="/icons/cancel-01-stroke-rounded.svg"
                  alt="Menu"
                  width={20}
                  loading="eager"
                  height={20}
                />
              )}
            </Button>
          </motion.div>
        </div>
      </div>
      {menuOpen && (
        <motion.div
          layout
          transition={{
            type: "spring",
            visualDuration: 0.2,
            bounce: 0.2,
          }}
          className="relative bg-neutral-800/90 backdrop-blur-sm w-full -mt-px z-50 overflow-hidden rounded-b-2xl shadow-lg"
        >
          <MenuPopover user={user} open={menuOpen} setOpen={setMenuOpen} />
        </motion.div>
      )}

      {menuOpen && (
        <div
          className="fixed w-full h-full top-0 left-0 bg-black/60 backdrop-blur-xl z-20"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      )}
    </div>
  );
}

export default Navbar;
