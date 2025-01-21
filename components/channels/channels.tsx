"use client";

import { ChannelProvider } from "ably/react";

import Chat from "./chat";

function Channels() {
  return (
    <ChannelProvider channelName={"default"}>
      <Chat />
    </ChannelProvider>
  );
}

export default Channels;
