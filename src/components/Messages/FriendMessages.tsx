import React, { useCallback, useEffect, useRef, useState } from "react";
import { AvatarHoverCard } from "../ui/AvatarHoverCard";
import { Button } from "../ui/button";
import { AiOutlinePhone, AiOutlineSend } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { Input } from "../ui/input";
import {
  ConversationId,
  zSendMessage,
  ztConversation,
  ztMessage,
} from "@/Types/Conversation";
import { socketConversations } from "@/lib/socket";
import { socketNameEmit, socketNameOn } from "@/utils/SocketName";
import { useUserStore } from "@/lib/useUserStore";
import { UserAvatarLink } from "../Header/UserAvatarLink";
import { ScrollArea } from "../ui/scroll-area";
import { DateConverter } from "@/utils/DateConverter";
import { useQuery } from "@tanstack/react-query";
import { QueryInfinite } from "@/utils/QueryInfinite";
import { UserId } from "@/Types/User";
import { Message } from "./Message";
type props = {
  conversation: ztConversation;
  onHearNotification: ({
    conversationId,
    userId,
  }: {
    conversationId: string;
    userId: UserId;
  }) => void;
};
export function FriendMessages(props: props) {
  const test = useRef<HTMLDivElement>(null);
  const userId = useUserStore((state) => state.user._id);
  const [input, setInput] = useState("");
  const [end, setEnd] = useState(false);
  const [skip, setSkip] = useState(props.conversation.messages.length);
  const [messages, setMessages] = useState<ztMessage[]>(
    props.conversation.messages,
  );
  const friend =
    props.conversation.userIds[0]._id === userId
      ? props.conversation.userIds[1]
      : props.conversation.userIds[0];
  const fetchingMessages = useCallback(() => {
    QueryInfinite<
      ztMessage[],
      { limit: number; skip: number; conversationId: string }
    >({
      url: "conversations/messages",
      cb(data: ztMessage[]) {
        setMessages((oldMsg) => [...data, ...oldMsg]);

        if (data.length > 0) {
          setSkip(skip + data.length);
        } else {
          setEnd(true);
        }
      },
      params: {
        limit: 5,
        skip,
        conversationId: props.conversation._id,
      },
    });
  }, [skip, props.conversation._id]);

  useEffect(() => {
    setEnd(false);
    setMessages(props.conversation.messages);
    setSkip(props.conversation.messages.length);
  }, [props.conversation._id, props.conversation.messages]);

  useEffect(() => {
    socketConversations.on(socketNameOn.receiveMessage, (data: ztMessage) => {
      if (data.conversationId === props.conversation._id) {
        setMessages((oldMsg) => [...oldMsg, data]);
        if (data.userId !== userId) {
          socketConversations.emit(socketNameEmit.seeMessages, userId);
        }
      } else if (data.conversationId) {
        props.onHearNotification({
          conversationId: data.conversationId,
          userId: userId,
        });
      }
      test.current!.scrollTop = test.current!.scrollHeight;
    });

    return () => {
      socketConversations.off(socketNameOn.receiveMessage);
    };
  }, []);
  function sendMessage() {
    const body = zSendMessage.parse({
      message: input,
      userId,
      conversationId: props.conversation._id,
      receiverId: friend._id,
    });
    socketConversations.emit(socketNameEmit.sendMessage, body);
  }
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.trim().length === 0) {
      return;
    }
    sendMessage();
    setInput("");
  }

  useEffect(() => {
    let fetching = false;
    const onScroll = async (e: Event) => {
      if (test.current) {
        const { scrollTop } = test.current!;
        if (!fetching && scrollTop <= 0) {
          console.log("Hello Top");
          fetching = true;
          if (fetching && !end) {
            await fetchingMessages();
          }
          fetching = false;
        }
      }
    };
    if (test.current) test.current.addEventListener("scroll", onScroll);

    return () => {
      test.current && test.current.removeEventListener("scroll", onScroll);
    };
  }, [skip, end]);
  return (
    <div className="flex flex-col gap-2">
      <header className="flex p-2 bg-muted justify-between items-center  [&>*]:flex [&>*]:items-center [&>*]:gap-2">
        <div>
          <UserAvatarLink user={friend} />
          <h1>{friend.username}</h1>
        </div>
        <div>
          <Button variant={"outline"}>
            <AiOutlinePhone />
          </Button>
          <Button variant={"outline"}>
            <BsCameraVideo />
          </Button>
          <Button variant={"outline"}>
            <CiSettings />
          </Button>
        </div>
      </header>
      <main className="bg-muted p-4 h-96  ">
        <div
          ref={test}
          className="[&>:not(first-child)]:mt-5 h-full overflow-scroll  w-full inline-flex flex-col "
        >
          {messages.map((msg) => {
            return (
              <Message
                msg={msg.message}
                isYourMessage={msg.userId === userId}
                date={msg.date}
                key={msg._id}
              />
            );
          })}
        </div>
      </main>
      <footer className="">
        <form onSubmit={submit} className="flex gap-2">
          <Input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Write something to them!"
          />
          <Button>
            <AiOutlineSend />
          </Button>
        </form>
      </footer>
    </div>
  );
}
