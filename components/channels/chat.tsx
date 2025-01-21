"use client";

import * as Ably from "ably";
import { useChannel, useConnectionStateListener } from "ably/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ablyClient } from "@/lib/ably-client";
import { ChatMessageCard } from "./chat-message-card";
import { CornerDownLeft, Mic, Paperclip, PlusIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";

function Chat() {
  const [activeChannel, setActiveChannel] = useState("default");
  const [query, setQuery] = useState("default");
  const [messages, setMessages] = useState<Ably.Message[]>([]);
  const [value, setValue] = useState("");

  useConnectionStateListener("connected", () => {
    toast("Connected to Ably");
  });

  // Create a channel called 'get-started' and subscribe to all messages with the name 'first' using the useChannel hook
  const { channel } = useChannel(activeChannel, (message) => {
    setMessages((previousMessages) => [...previousMessages, message]);
  });

  async function sendMessage() {
    await channel.publish({ name: activeChannel, data: value });
    setValue("");
  }

  return (
    <div className="flex flex-col h-full space-y-2 overflow-hidden">
      <div className="relative rounded-lg overflow-hidden flex items-center">
        <label htmlFor="channel_input" className="absolute left-4">
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
          className="bg-neutral-800 text-base h-10 pl-12 pr-14"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          className="absolute h-full w-12 right-0 rounded-l-none top-0 bg-neutral-900/70"
          variant="secondary"
          size="icon"
          disabled={!query}
          onClick={() => {
            setActiveChannel(query);
            ablyClient.channels.get(activeChannel);
          }}
        >
          <PlusIcon />
        </Button>
      </div>
      <div className="flex-grow bg-neutral-900 rounded-xl p-6 overflow-y-auto">
        {messages && messages.length > 0 && (
          <ul className="flex flex-col space-y-4">
            {messages.map((message, index) => (
              <li key={message.id ?? index}>
                <ChatMessageCard message={message} isSent={index % 2 === 0} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <div className="relative rounded-xl border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your message here..."
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
