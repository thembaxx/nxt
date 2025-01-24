"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  ConnectionStatus,
  Reaction,
  useChatConnection,
  useRoomReactions,
} from "@ably/chat";
import clsx from "clsx";

const reactions = ["👍", "❤️", "💥", "🚀", "💔"];

const Reactions = () => {
  const { currentStatus } = useChatConnection();

  const [roomReactions, setRoomReactions] = useState<Reaction[]>([]);
  const { send: sendReaction } = useRoomReactions({
    listener: (reaction: Reaction) => {
      setRoomReactions([...roomReactions, reaction]);
    },
  });

  const disabled = currentStatus !== ConnectionStatus.Connected;

  const reactionArr: { type: string; reactions: Reaction[] }[] = [];
  roomReactions.forEach((reaction) => {
    const index = reactionArr.findIndex((r) => r.type === reaction.type);
    if (index !== -1) reactionArr[index].reactions.push(reaction);
    else reactionArr.push({ type: reaction.type, reactions: [reaction] });
  });

  const buttons = reactions.map((reaction) => {
    let count = 0;
    const match = reactionArr.find((r) => r.type === reaction);
    if (match) count = match.reactions.length;

    return (
      <motion.button
        key={reaction}
        className={clsx(
          "w-[22px] shrink-0 cursor-pointer",
          disabled ? "cursor-not-allowed" : ""
        )}
        whileTap={{ scale: 0.85 }}
        onClick={async (e) => {
          e.preventDefault();
          if (!disabled) {
            await sendReaction({ type: reaction });
          }
        }}
      >
        <div className="flex flex-col items-center">
          <>{reaction}</>
          <span
            className={clsx(
              "text-[11px] leading-none font-mono mt-1",
              count === 0 ? "text-[#EBEBF5]/60" : "text-neutral-100"
            )}
          >
            {count}
          </span>
        </div>
      </motion.button>
    );
  });

  return (
    <div className="reactions-picker">
      <div className="space-x-1">{buttons}</div>
    </div>
  );
};

export default Reactions;
