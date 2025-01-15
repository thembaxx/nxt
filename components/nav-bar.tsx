import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Navbar() {
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
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="text-[11px]">CN</AvatarFallback>
        </Avatar>
        <Button size="icon" variant="ghost" className="relative p-0">
          <Image
            src="/icons/menu-01-stroke-rounded.svg"
            alt="Menu"
            width={16}
            loading="eager"
            height={16}
          />
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
