"use client";
import { zAddFriend, ztAddFriend } from "@/Types/Friend";
import {
  NotificationId,
  zFriendRequest,
  ztFriendRequest,
} from "@/Types/Notification";
import { UserId } from "@/Types/User";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/axios.api";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function useDeclineFriendRequest() {
  const { toast } = useToast();
  const declineFriendRequest = useMutation({
    mutationKey: ["addFriend"],
    mutationFn: async (data: ztFriendRequest) => {
      const parsedData = zFriendRequest.parse(data);
      return api
        .patch<boolean>("friends/decline-friend", parsedData, {
          withCredentials: true,
        })
        .then((result) => {
          toast({
            title: "Declined Friend Request",
            action: <ToastAction altText="Alright">Alright</ToastAction>,
          });
          return result;
        });
    },
  });
  return declineFriendRequest;
}
