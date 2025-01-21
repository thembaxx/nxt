import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import * as Ably from "ably";
import clsx from "clsx";
import Image from "next/image";

interface ChatMessageCardProps {
  user: User;
  message: Ably.Message;
  isSent: boolean;
}

const avatarStyle = [
  "bg-[#9B51F2] text-white",
  "bg-[#FF7343] text-white",
  "bg-[#2DC3FF] text-white",
  "bg-[#00C008] text-white",
  "bg-[#F8C100] text-[#1e1e1e]",
  "bg-[#FF17D2] text-white",
  "bg-[#781AEE] text-white",
  "bg-[#AEB6BF] text-white",
];

export function ChatMessageCard({
  user,
  message,
  isSent,
}: ChatMessageCardProps) {
  return (
    <div
      className={cn(
        "flex items-start space-x-2 mb-4",
        isSent ? "flex-row-reverse space-x-reverse" : "flex-row"
      )}
    >
      <Avatar
        className={clsx(
          "w-8 h-8 relative flex items-center justify-center",
          avatarStyle[Math.floor(Math.random() * avatarStyle.length)]
        )}
      >
        {user && user.image && <AvatarImage src={user.image} alt="" />}
        {(!user || !user.image) && (
          <Image
            src="/icons/user-stroke-rounded.svg"
            alt=""
            height={16}
            width={16}
          />
        )}
      </Avatar>
      <div
        className={cn(
          "flex flex-col max-w-[70%]",
          isSent ? "items-end" : "items-start"
        )}
      >
        {user && user.name && (
          <p className="text-xs text-neutral-300 font-medium mb-2">
            {user.name}
          </p>
        )}
        <div
          className={cn(
            "rounded-lg px-3 py-2 text-sm",
            isSent ? "bg-primary text-primary-foreground" : "bg-muted"
          )}
        >
          {message?.data}
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {message?.timestamp
            ? new Date(message?.timestamp).toDateString()
            : ""}
        </span>
      </div>
    </div>
  );
}
