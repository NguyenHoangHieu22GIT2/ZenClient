"use client";
import { api } from "@/lib/axios.api";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import jsCookie from "js-cookie";
import { useUserStore } from "@/lib/useUserStore";
import { socketConversations } from "@/lib/socket";
import { socketNameEmit } from "@/utils/SocketName";
import { ztConversation } from "@/Types/Conversation";
import { useChatSystemStore } from "@/lib/useChatSystemStore";
import { zUserMinimalData, ztUserMinimalData } from "@/Types/User";
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
          console.log(result.data);
          const user: ztUserMinimalData = result.data.user;
          const isAdmin: boolean = result.data.isAdmin;
          changeUser(user, isAdmin);
        })
        .catch((err) => {
          jsCookie.remove("userId");
          router.replace("/login");
        });
    }
  }, [changeUser, router]);

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
  }, [userId, changeNotified]);
};

export default useCheckAuth;
