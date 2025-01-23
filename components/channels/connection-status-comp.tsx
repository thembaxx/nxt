"use client";

import * as React from "react";
import { ConnectionState } from "ably";

import { cn, toUpper } from "@/lib/utils";

interface Props {
  currentStatus: ConnectionState | null;
}

const Status = React.forwardRef<HTMLInputElement, React.ComponentProps<"div">>(
  ({ className, children }, ref) => {
    return (
      <div
        className="flex items-center space-x-2 pl-1.5 pr-2.5 bg-neutral-800 py-1 rounded-full"
        ref={ref}
      >
        <div
          className={cn(
            "h-3 w-3 bg-neutral-500 rounded-full animate-pulse",
            className
          )}
        />
        <p className="text-xs font-medium text-neutral-300">{children}</p>
      </div>
    );
  }
);

Status.displayName = "Status";

function ConnectionStatusComp({ currentStatus }: Props) {
  switch (currentStatus) {
    case "connected":
      return (
        <Status className="bg-[#30D158] shadow-md shadow-[#30D158]/40">
          {toUpper(currentStatus.toString())}
        </Status>
      );

    case "connecting":
      return (
        <Status className="bg-[#0A84FF] shadow-md shadow-[#0A84FF]/40">
          {toUpper(currentStatus.toString())}
        </Status>
      );

    case "disconnected":
      return (
        <Status className="bg-[#FFD60A] shadow-md shadow-[#FFD60A]/40">
          {toUpper(currentStatus.toString())}
        </Status>
      );

    case "suspended":
      return (
        <Status className="bg-[#FF9F0A] shadow-md shadow-[#FF9F0A]/40">
          {toUpper(currentStatus.toString())}
        </Status>
      );

    case "failed":
      return (
        <Status className="bg-[#FF453A] shadow-md shadow-[#FF453A]/40">
          {toUpper(currentStatus.toString())}
        </Status>
      );
  }

  return <></>;
}

export default ConnectionStatusComp;
