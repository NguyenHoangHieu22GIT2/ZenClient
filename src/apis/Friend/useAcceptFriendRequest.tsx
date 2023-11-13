import { zFriendRequest, ztFriendRequest } from "@/Types/Notification";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/axios.api";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function useAcceptFriendRequest() {
  const { toast } = useToast();
  const acceptFriendRequesst = useMutation({
    mutationKey: ["addFriend"],
    mutationFn: async (data: ztFriendRequest) => {
      const parsedData = zFriendRequest.parse(data);
      return api
        .patch<boolean>("friends/accept-friend", parsedData, {
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
  return acceptFriendRequesst;
}
