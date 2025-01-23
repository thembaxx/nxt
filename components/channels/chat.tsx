"use client";

import * as Ably from "ably";
import { useChannel, useConnectionStateListener } from "ably/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatMessageCard } from "./chat-message-card";
import { CornerDownLeft, Mic, Paperclip, PlusIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { User } from "@/lib/definitions";
import ConnectionStatusComp from "./connection-status-comp";

function Chat() {
  const session = authClient.useSession();
  const user = session?.data?.user as User;

  const [activeChannel, setActiveChannel] = useState("default");
  const [query, setQuery] = useState("default");
  const [messages, setMessages] = useState<Ably.Message[]>([]);
  const [value, setValue] = useState("");
  const [connState, setConnState] = useState<Ably.ConnectionState | null>(null);

  useConnectionStateListener((state: Ably.ConnectionStateChange) => {
    const currentState = state.current;
    setConnState(currentState);
    if (currentState === "connected") toast("Ably connected successfully");
  });

  // Create a channel called 'get-started' and subscribe to all messages with the name 'first' using the useChannel hook
  // const { channel } = useChannel(activeChannel, (message) => {
  //   setMessages((previousMessages) => [...previousMessages, message]);
  // });

  const { channel, ably } = useChannel(activeChannel, (message) => {
    const history = messages.slice(-199);
    setMessages([...history, message]);
  });

  async function sendChatMessage(messageText: string) {
    await channel.publish({ name: activeChannel, data: messageText });
    setValue("");
  }

  return (
    <div className="flex flex-col relative h-full space-y-2 ">
      <div className="w-full flex flex-col relative flex-grow">
        <div className="p-4 absolute top-0 left-0">
          <ConnectionStatusComp currentStatus={connState} />
        </div>

        <div className="grow bg-neutral-900 rounded-xl p-6 pt-12 relative overflow-x-hidden overflow-y-auto">
          {messages && messages.length > 0 && (
            <ul className="flex flex-col space-y-4">
              {messages.map((message, index) => (
                <li key={message.id ?? index}>
                  <ChatMessageCard
                    user={user}
                    message={message}
                    isSent={index % 2 === 0}
                  />
                </li>
              ))}
            </ul>
          )}
          {(!messages || messages.length === 0) && (
            <div className="h-full space-y-4 flex flex-col items-center justify-center">
              <Image
                src="icons/tv-fix-stroke-rounded.svg"
                alt=""
                height={64}
                width={64}
              />
              <p className="text-sm text-neutral-400 text-center text-pretty max-w-48">
                Create a channel and send a message to get started.
              </p>
            </div>
          )}

          <div className=" rounded-lg overflow-hidden flex items-center absolute bottom-0 left-0 p-3 shadow-md w-full">
            <label htmlFor="channel_input" className="absolute left-6">
              <Image
                src="/icons/rss-stroke-rounded.svg"
                alt=""
                height={20}
                width={20}
              />
            </label>
            <Input
              id="channel_input"
              value={query}
              type="text"
              placeholder="Create or join a channel"
              className="bg-neutral-800 text-base h-10 pl-12 grow pr-14"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              className="absolute h-full w-12 shrink-0 right-0 rounded-l-none top-0 bg-neutral-900/70"
              variant="secondary"
              size="icon"
              disabled={!query}
              onClick={() => {
                setActiveChannel(query);
                ably.channels.get(activeChannel);
              }}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendChatMessage(value);
        }}
      >
        <div className="relative rounded-xl border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your message here..."
            onKeyDown={(event) => {
              if (event.key !== "Enter" || !value || value === "") {
                return;
              }
              sendChatMessage(value);
              event.preventDefault();
            }}
            className="min-h-12 text-base resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            <Button variant="ghost" size="icon" type="button">
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>

            <Button variant="ghost" size="icon" type="button">
              <Mic className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>

            <Button
              type="submit"
              size="sm"
              className="ml-auto gap-1.5"
              disabled={!value}
            >
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Chat;
