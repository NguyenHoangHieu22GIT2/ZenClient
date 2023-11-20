"use client";
// THIS IS DEPRECATED, NOT GOING TO USE THIS :D (for now still use)
import { api } from "@/lib/axios.api";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import jsCookie from "js-cookie";
import { useUserStore } from "@/lib/useUserStore";
import { socketConversations } from "@/lib/socket";
import { socketNameEmit } from "@/utils/SocketName";
import { zConversation, ztConversation } from "@/Types/Conversation";
import { useChatSystemStore } from "@/lib/useChatSystemStore";
const useCheckAuth = () => {
  const changeUser = useUserStore((state) => state.changeUser);
  const router = useRouter();
  const userId = useUserStore((state) => state.user._id);
  const changeNotified = useChatSystemStore((state) => state.changeNotified);
  useEffect(() => {
    if (window) {
      api
        .get("auth/validate-jwt-token", { withCredentials: true })
        .then((result) => {
          changeUser(result.data);
        })
        .catch((err) => {
          jsCookie.remove("userId");
          router.replace("/login");
        });
    }
  }, []);

  useEffect(() => {
    if (userId)
      socketConversations.emit(
        socketNameEmit.joinAllChatRoom,
        { userId },
        (data: ztConversation[]) => {
          let i = data.length;
          while (i--) {
            const conversation = data[i];
            if (conversation.notificationForWho === userId) {
              changeNotified(true);
              break;
            }
          }
        }
      );

    return () => {
      socketConversations.off(socketNameEmit.joinAllChatRoom);
    };
  }, [userId]);
};

export default useCheckAuth;
