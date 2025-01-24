"use client";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import {
  ChatClient,
  ChatClientProvider,
  ChatRoomProvider,
  LogLevel,
  RoomOptionsDefaults,
} from "@ably/chat";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chat = dynamic(
  () => Promise.resolve(import("@/components/channels/chat")),
  {
    ssr: false,
  }
);

let roomId: string;
(function () {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("room")) {
    roomId = "default";
    params.set("room", roomId);
    history.replaceState(null, "", "?" + params.toString());
  } else {
    roomId = params.get("room")!;
  }
})();

function Channels() {
  const client = new Ably.Realtime({ authUrl: "/api/ably" });
  const chatClient = new ChatClient(client, {
    logLevel: LogLevel.Info,
  });

  const [roomIdState, setRoomId] = useState(roomId);

  const updateRoomId = (newRoomId: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("room", newRoomId);
    history.pushState(null, "", "?" + params.toString());
    setRoomId(newRoomId);
  };

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const newRoomId = params.get("room") || "default";
      setRoomId(newRoomId);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <AblyProvider client={client}>
      <ChatClientProvider client={chatClient}>
        <ChatRoomProvider
          id={roomIdState}
          release={true}
          attach={true}
          options={RoomOptionsDefaults}
        >
          <Chat setRoomId={updateRoomId} roomId={roomIdState} />
        </ChatRoomProvider>
      </ChatClientProvider>
    </AblyProvider>
  );
}

export default Channels;
