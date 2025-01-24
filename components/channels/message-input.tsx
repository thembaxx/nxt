"use client";

import { Button } from "../ui/button";
import { motion } from "motion/react";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import {
  ConnectionStatus,
  useChatClient,
  useChatConnection,
  useMessages,
  useTyping,
} from "@ably/chat";
import { Textarea } from "../ui/textarea";

function MessageInput() {
  const { send } = useMessages();
  const { start, stop } = useTyping();
  const { currentStatus } = useChatConnection();

  const chatClient = useChatClient();
  const clientId = chatClient.clientId;
  const { currentlyTyping, error } = useTyping();

  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // disable the input if the connection is not established
    setDisabled(currentStatus !== ConnectionStatus.Connected);
  }, [currentStatus]);

  const handleStartTyping = () => {
    start().catch((error: unknown) => {
      console.error("Failed to start typing indicator", error);
    });
  };
  const handleStopTyping = () => {
    stop().catch((error: unknown) => {
      console.error("Failed to stop typing indicator", error);
    });
  };

  const handleValueChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => {
    // Typing indicators start method should be called with every keystroke since
    // they automatically stop if the user stops typing for a certain amount of time.

    setValue(target.value);

    // The timeout duration can be configured when initializing the room.
    if (target.value && target.value.length > 0) {
      handleStartTyping();
    } else {
      // For good UX we should stop typing indicators as soon as the input field is empty.
      handleStopTyping();
    }
  };

  const handleFormSubmit: string | FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    if (typeof event !== "string") {
      event.preventDefault();
      event.stopPropagation();
    }

    // do nothing in case we don't have a ref to the input element

    // send the message and reset the input field
    send({ text: value })
      .then(() => {
        setValue("");
      })
      .catch((error: unknown) => {
        console.error("Failed to send message", error);
      });

    // stop typing indicators
    handleStopTyping();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        {error && (
          <div className="text-red-600 dark:text-red-500 p-3">
            Typing indicator error: {error.message}
          </div>
        )}
        {!error && (
          <div className="typing-indicator-container">
            {new Array(...currentlyTyping)
              .filter((client) => client !== clientId)
              .map((client) => (
                <p key={client}>{client} is typing...</p>
              ))}
          </div>
        )}
      </div>
      <div className="relative rounded-xl border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
        <Textarea
          className="min-h-12 text-base resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          value={value}
          placeholder="Type your message here..."
          autoFocus
          onChange={handleValueChange}
          onKeyDown={(event) => {
            if (event.key !== "Enter" || !value || value === "") {
              return;
            }

            send({ text: value })
              .then(() => {
                setValue("");
              })
              .catch((error: unknown) => {
                console.error("Failed to send message", error);
              });

            // stop typing indicators
            handleStopTyping();

            event.preventDefault();
          }}
        />
        <div className="flex items-center justify-between p-3 pt-0 relative z-10 w-full">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" type="button">
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>

            <Button variant="ghost" size="icon" type="button">
              <Mic className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>
          </div>

          <motion.div whileTap={{ scale: 0.95 }} className="cursor-pointer">
            <Button
              type="submit"
              size="sm"
              className="ml-auto gap-1.5 cursor-pointer"
              disabled={!value || disabled}
            >
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </form>
  );
}

export default MessageInput;
