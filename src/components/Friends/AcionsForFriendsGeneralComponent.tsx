"use client";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { UserId, ztUserMinimalData } from "@/Types/User";
import { checkUsersType } from "@/utils/CheckUsersType";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import UseNotInterestedMutation from "@/apis/Friend/UseNotInterestedMutation";
import useAddFriendMutation from "@/apis/Friend/useAddFriendMutation";
import { ToastAction } from "@radix-ui/react-toast";

type props = {
  filterState: any;
  userId: UserId;
  args?: any;
};

export const AcionsForFriendsGeneralComponent = (props: props) => {
  const { toast } = useToast();
  const usersTypeResult = useMemo(() => {
    return checkUsersType(props.filterState);
  }, [props.filterState]);
  const notInterestedMutation = UseNotInterestedMutation();
  const addFriendMutation = useAddFriendMutation();
  function notInterested(userId: UserId) {
    notInterestedMutation.mutate(userId);
  }
  function addFriend(userId: UserId) {
    addFriendMutation.mutate(userId);
  }

  useEffect(() => {
    if (notInterestedMutation.data) {
      if (usersTypeResult !== "not-interested") {
        toast({
          title: "Will not recommend this user in the future",
          description:
            "If you want to add friend with this user, go to his profile.",
          action: <ToastAction altText="Okay!">Okay!</ToastAction>,
        });
      } else {
        toast({
          title: "This user will be recommended again in the future!",
          description: "",
          action: <ToastAction altText="Okay">Okay</ToastAction>,
        });
      }
      // removeUserNotInterested(notInterestedMutation.data);
    }
  }, [notInterestedMutation.data]);
  const [alreadySentTheRequest, setAlreadySentTheRequest] = useState(false);
  useEffect(() => {
    if (addFriendMutation.data) {
      setAlreadySentTheRequest(addFriendMutation.data.hasSent);
    }
  }, [addFriendMutation.data]);
  return (
    <>
      <Button
        disabled={
          notInterestedMutation.isLoading || addFriendMutation.isLoading
            ? true
            : false
        }
        onClick={notInterested.bind(null, props.userId)}
        variant={"ghost"}
      >
        {usersTypeResult === "not-interested" ? "Remove NI" : "Not interested"}
      </Button>
      <Button
        disabled={
          notInterestedMutation.isLoading || addFriendMutation.isLoading
            ? true
            : false
        }
        onClick={addFriend.bind(null, props.userId)}
        variant={"default"}
      >
        {alreadySentTheRequest ? "Remove request" : "Add Friend"}
      </Button>
    </>
  );
};
