"use client";
import { zAddFriend, ztAddFriend } from "@/Types/Friend";
import { UserId } from "@/Types/User";
import { api } from "@/lib/axios.api";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function useAddFriendMutation() {
  const addFriendMutation = useMutation({
    mutationKey: ["addFriend"],
    mutationFn: async (data: UserId | string) => {
      return api
        .patch<ztAddFriend>(
          "friends/add-friend",
          { userId: data },
          {
            withCredentials: true,
          },
        )
        .then((result) => {
          const parsedResult = zAddFriend.parse(result.data);
          return parsedResult;
        });
    },
  });
  return addFriendMutation;
}
