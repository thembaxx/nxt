"use client";

import { UserContextProvider } from "@/context/user-context";
import { AblyProvider } from "ably/react";
import { ablyClient } from "@/lib/ably-client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserContextProvider>
      <AblyProvider client={ablyClient}>{children}</AblyProvider>
    </UserContextProvider>
  );
}
