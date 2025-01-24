"use client";

import * as React from "react";
import { ConnectionStatus, useChatConnection } from "@ably/chat";

import { cn, toUpper } from "@/lib/utils";

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

function ConnectionStatusComp() {
  const { currentStatus } = useChatConnection();

  switch (currentStatus) {
    case ConnectionStatus.Connected:
      return (
        <Status className="bg-[#30D158] shadow-md shadow-[#30D158]/40">
          {toUpper(currentStatus.toString())}
        </Status>
      );

    case ConnectionStatus.Connecting:
      return (
        <Status className="bg-[#0A84FF] shadow-md shadow-[#0A84FF]/40">
          {toUpper(currentStatus.toString())}
        </Status>
      );

    case ConnectionStatus.Disconnected:
      return (
        <Status className="bg-[#FFD60A] shadow-md shadow-[#FFD60A]/40">
          {toUpper(currentStatus.toString())}
        </Status>
      );

    case ConnectionStatus.Suspended:
      return (
        <Status className="bg-[#FF9F0A] shadow-md shadow-[#FF9F0A]/40">
          {toUpper(currentStatus.toString())}
        </Status>
      );

    case ConnectionStatus.Failed:
      return (
        <Status className="bg-[#FF453A] shadow-md shadow-[#FF453A]/40">
          {toUpper(currentStatus.toString())}
        </Status>
      );
    default:
      return <Status className="bg-neutral-600">Unknown</Status>;
  }

  return <></>;
}

export default ConnectionStatusComp;
