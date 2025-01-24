"use client";

import * as Ably from "ably";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatMessageCard } from "./chat-message-card";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { User } from "@/lib/definitions";
import ConnectionStatusComp from "./connection-status-comp";
import {
  Message,
  MessageEventPayload,
  MessageEvents,
  useMessages,
} from "@ably/chat";
import Reactions from "./reactions";
import MessageInput from "./message-input";

interface Props {
  roomId: string;
  setRoomId: (roomId: string) => void;
}

function Chat({ roomId, setRoomId }: Props) {
  const session = authClient.useSession();
  const user = session?.data?.user as User;

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(true);
  const [currentRoomId, setCurrentRoomId] = useState(roomId);
  const [messages, setMessages] = useState<Message[]>([]);
 


  const { getPreviousMessages } = useMessages({
    listener: (message: MessageEventPayload) => {
      switch (message.type) {
        case MessageEvents.Created: {
          setMessages((prevMessages) => {
            // if already exists do nothing
            const index = prevMessages.findIndex(
              (m) => m.serial === message.message.serial
            );
            if (index !== -1) {
              return prevMessages;
            }

            // if the message is not in the list, add it
            const newArray = [...prevMessages, message.message];

            // and put it at the right place
            newArray.sort((a, b) => (a.before(b) ? -1 : 1));

            return newArray;
          });
          break;
        }
        case MessageEvents.Deleted: {
          setMessages((prevMessage) => {
            const updatedArray = prevMessage.filter((m) => {
              return m.serial !== message.message.serial;
            });

            // don't change state if deleted message is not in the current list
            if (prevMessage.length === updatedArray.length) {
              return prevMessage;
            }

            return updatedArray;
          });
          break;
        }
        case MessageEvents.Updated: {
          handleUpdatedMessage(message.message);
          break;
        }
        default: {
          console.error("Unknown message", message);
        }
      }
    },
    onDiscontinuity: (discontinuity) => {
      console.log("Discontinuity", discontinuity);
      // reset the messages when a discontinuity is detected,
      // this will trigger a re-fetch of the messages
      setMessages([]);

      // set our state to loading, because we'll need to fetch previous messages again
      setLoading(true);

      // Do a message backfill
      backfillPreviousMessages(getPreviousMessages);
    },
  });

  const handleUpdatedMessage = (message: Message) => {
    setMessages((prevMessages) => {
      const index = prevMessages.findIndex((m) => m.serial === message.serial);
      if (index === -1) {
        return prevMessages;
      }

      // skip update if the received version is not newer
      if (!prevMessages[index].versionBefore(message)) {
        return prevMessages;
      }

      const updatedArray = [...prevMessages];
      updatedArray[index] = message;
      return updatedArray;
    });
  };



  const backfillPreviousMessages = (
    getPreviousMessages: ReturnType<typeof useMessages>["getPreviousMessages"]
  ) => {
    if (getPreviousMessages) {
      getPreviousMessages({ limit: 50 })
        .then((result: Ably.PaginatedResult<Message>) => {
          setMessages(result.items.filter((m) => !m.isDeleted).reverse());
          setLoading(false);
        })
        .catch((error: Ably.ErrorInfo) => {
          console.error(
            `Failed to backfill previous messages: ${error.toString()}`,
            error
          );
        });
    }
  };

  // Create a channel called 'get-started' and subscribe to all messages with the name 'first' using the useChannel hook
  // const { channel } = useChannel(activeChannel, (message) => {
  //   setMessages((previousMessages) => [...previousMessages, message]);
  // });

  // const { channel, ably } = useChannel(activeChannel, (message) => {
  //   const history = messages.slice(-199);
  //   setMessages([...history, message]);
  // });

  // async function sendChatMessage(messageText: string) {
  //   await channel.publish({ name: activeChannel, data: messageText });
  //   setValue("");
  // }

  useEffect(() => {
    console.debug("updating getPreviousMessages useEffect", {
      getPreviousMessages,
    });
    backfillPreviousMessages(getPreviousMessages);
  }, [getPreviousMessages]);

  const scrollToBottom = () => {
    if (!messagesEndRef || !messagesEndRef.current) return;

    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!loading) {
      scrollToBottom();
    }
  }, [messages, loading]);

  return (
    <div className="flex flex-col relative h-full space-y-2 ">
      <div className="w-full flex flex-col relative flex-grow">
        <div className="p-4 absolute flex justify-between w-full items-start top-0 left-0 z-10">
          <ConnectionStatusComp />
          <Reactions />
        </div>

        <div className="grow bg-neutral-900 rounded-xl p-6 pt-24 relative overflow-x-hidden overflow-y-auto">
          {messages && messages.length > 0 && (
            <ul className="flex flex-col space-y-4">
              {messages.map((message, index) => (
                <li key={"message " + index}>
                  <ChatMessageCard
                    user={user}
                    message={message}
                    isSent={index % 2 === 0}
                  />
                </li>
              ))}
              <div ref={messagesEndRef} />
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

          <div className="   z-10 absolute bottom-0 left-0 p-3 w-full">
            <div className="flex w-full rounded-xl overflow-hidden items-center group shadow-xl border relative">
              <label htmlFor="channel_input" className="absolute left-0 ml-3">
                <Image
                  src="/icons/rss-stroke-rounded.svg"
                  alt=""
                  height={20}
                  width={20}
                />
              </label>

              <Input
                id="channel_input"
                value={currentRoomId}
                type="text"
                placeholder="Create or join a channel"
                className="bg-neutral-800 text-base h-10 pl-12 w-full grow rounded-none focus:group-focus:outline-2"
                onChange={(e) => setCurrentRoomId(e.target.value)}
              />

              <Button
                className=" h-10 w-12 shrink-0 rounded-l-none bg-neutral-900/70"
                variant="secondary"
                size="icon"
                disabled={!currentRoomId}
                onClick={() => setRoomId(currentRoomId)}
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <MessageInput />
      </div>
    </div>
  );
}

export default Chat;
