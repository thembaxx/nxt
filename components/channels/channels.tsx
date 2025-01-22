"use client";

import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import dynamic from "next/dynamic";

// const Chat = dynamic(() => import("@/components/channels/chat"), {
//   ssr: false,
// });
const Chat = dynamic(
  () => Promise.resolve(import("@/components/channels/chat")),
  {
    ssr: false,
  }
);

function Channels() {
  const client = new Ably.Realtime({ authUrl: "/api/ably" });
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="default">
        <Chat />
      </ChannelProvider>
    </AblyProvider>
  );
}

export default Channels;
