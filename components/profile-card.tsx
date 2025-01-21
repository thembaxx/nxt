import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/definitions";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  user: User;
};

function ProfileCard({ user }: Props) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-10 w-10">
        {user.image && <AvatarImage src={user.image} />}
        <AvatarFallback className="text-[11px] text-neutral-400 font-semibold bg-black/15">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-grow text-[13px] mr-2">
        <p className="font-medium truncate">{user.name}</p>
        <p className=" text-neutral-400 truncate">{user.email}</p>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="relative p-0"
        aria-label="Profile Settings"
      >
        <Image
          src="/icons/square-arrow-up-right-02-stroke-rounded.svg"
          alt="Profile"
          width={24}
          loading="eager"
          height={24}
        />
      </Button>
    </div>
  );
}

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
