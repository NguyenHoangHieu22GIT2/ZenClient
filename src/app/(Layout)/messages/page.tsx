"use client";
import React, { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { FriendList } from "@/components/Messages/FriendList";
import { FriendMessages } from "@/components/Messages/FriendMessages";
import { api } from "@/lib/axios.api";
import { useQuery } from "@tanstack/react-query";
import {
  ConversationId,
  zConversation,
  ztConversation,
} from "@/Types/Conversation";
import { socketConversations } from "@/lib/socket";
import { socketNameEmit } from "@/utils/SocketName";
import { useUserStore } from "@/lib/useUserStore";
import { z } from "zod";
import { UserId } from "@/Types/User";
import { v4 } from "uuid";
import { useChatSystemStore } from "@/lib/useChatSystemStore";

export default function MessagesPage() {
  const user = useUserStore((state) => state.user);
  const [conversation, setConversation] = useState<ztConversation>();
  const [conversations, setConversations] = useState<ztConversation[]>([]);
  const [keyForFriendList, setKeyForFriendList] = useState(v4());
  const setNotified = useChatSystemStore((state) => state.changeNotified);
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-conversation"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const result = await api.get<ztConversation[]>(
        "chat-system/get-conversations",
        {
          withCredentials: true,
        },
      );
      const parsedResult = z.array(zConversation).parse(result.data);
      setConversations(parsedResult);
      joinChatRoom(parsedResult[0]._id);
      return parsedResult;
    },
  });
  if (!data || isLoading) {
    return <h1>is Loading...</h1>;
  }
  function joinChatRoom(convoId: ConversationId) {
    socketConversations.emit(
      socketNameEmit.joinChatRoom,
      {
        conversationId: convoId,
        userId: user._id,
      },
      (data: ztConversation) => {
        if (data) {
          setConversation(data);
          setNotification({ userId: v4() as UserId, conversationId: data._id });
        }
      },
    );
  }
  function setNotification({
    conversationId,
    userId,
  }: {
    conversationId: string;
    userId: UserId;
  }) {
    setConversations((oldConversations) => {
      let conversations: ztConversation[] = [];
      oldConversations.forEach((oldConvo) => {
        if (oldConvo._id === conversationId) {
          oldConvo.notificationForWho = userId;
          setKeyForFriendList(v4());
          conversations.unshift(oldConvo);
        } else {
          conversations.push(oldConvo);
        }
        return oldConvo;
      });
      return conversations;
    });
  }

  return (
    <Container className="mt-5">
      <main className="flex md:flex-row flex-col gap-5 h-[90vh] p-3  [&>:first-child]:basis-1/4 [&>:last-child]:basis-3/4">
        <FriendList
          key={keyForFriendList}
          friendList={conversations}
          onJoinChatRoom={joinChatRoom}
        />
        {conversation ? (
          <FriendMessages
            onHearNotification={setNotification}
            key={conversation._id}
            conversation={conversation}
          />
        ) : (
          <h1>Loading...</h1>
        )}
      </main>
    </Container>
  );
}
