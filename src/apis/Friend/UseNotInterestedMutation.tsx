import { zFriendDocument, ztFriendDocument } from "@/Types/Friend";
import { UserId } from "@/Types/User";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/axios.api";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function UseNotInterestedMutation() {
  //   const { toast } = useToast();
  const notInterestedMutation = useMutation({
    mutationKey: ["notInterested"],
    mutationFn: (data: UserId) => {
      return api
        .patch<UserId>(
          "friends/not-interested",
          {
            userId: data,
          },
          {
            withCredentials: true,
          },
        )
        .then((result) => {
          return result.data;
        });
    },
  });
  return notInterestedMutation;
}
