"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  UserId,
  zUserMinimalData,
  zUser,
  ztUserMinimalData,
} from "@/Types/User";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";
import { useAuthStore } from "@/lib/storeZustand";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { imageUrl } from "@/utils/imageUrl";
import { filterReducerType } from "./NotInterestedFriends";
import { checkUsersType } from "@/utils/CheckUsersType";
import { Description } from "@radix-ui/react-toast";
import { Toaster } from "../ui/toaster";

type props = {
  user: ztUserMinimalData;
  removeUserNotInterested: (userId: UserId) => void;
  filterState: filterReducerType;
};

export const Friend = (props: props) => {
  const { toast } = useToast();
  const usersTypeResult = useMemo(() => {
    return checkUsersType(props.filterState);
  }, [props.filterState]);
  const [alreadySentTheRequest, setAlreadySentTheRequest] = useState(false);
  const access_token = useAuthStore((state) => state.access_token);
  const notInterestedMutation = useMutation({
    mutationKey: ["notInterested"],
    mutationFn: (data: UserId) => {
      return api
        .patch(
          process.env.NEXT_PUBLIC_SERVER_NOT_INTERESTED_USER,
          {
            userId: data,
          },
          {
            headers: {
              Authorization: Bearer(access_token),
            },
          }
        )
        .then((result) => {
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
          props.removeUserNotInterested(data);
          return result;
        });
    },
  });
  const addFriendMutation = useMutation({
    mutationKey: ["addFriend"],
    mutationFn: (data: UserId) => {
      return api
        .patch(
          process.env.NEXT_PUBLIC_SERVER_ADD_FRIEND,
          { userId: data },
          {
            headers: {
              Authorization: Bearer(access_token),
            },
          }
        )
        .then((data) => {
          setAlreadySentTheRequest(data.data.hasSent);
          return data;
        });
    },
  });
  function notInterested() {
    notInterestedMutation.mutate(props.user._id);
  }
  function addFriend() {
    //TODO:Send back to server the userId so that the server can send a friend request
    addFriendMutation.mutate(props.user._id);
  }
  return (
    <Card className="shadow-lg overflow-hidden rounded-lg">
      <CardHeader className="p-0 mx-auto">
        <Link href={`/user/${props.user._id}`}>
          <Image
            className="mx-auto"
            src={
              props.user.avatar ? imageUrl(props.user.avatar) : "/avatar.jpg"
            }
            alt={props.user.username}
            width={500}
            height={500}
          />
        </Link>
      </CardHeader>
      <CardContent className="mt-5">
        <CardTitle>{props.user.username}</CardTitle>
        <CardDescription>{props.user.email}</CardDescription>
      </CardContent>
      <CardFooter className="grid grid-cols-2">
        <Button
          disabled={
            notInterestedMutation.isLoading || addFriendMutation.isLoading
              ? true
              : false
          }
          onClick={notInterested}
          variant={"ghost"}
        >
          {usersTypeResult === "not-interested"
            ? "Remove NI"
            : "Not interested"}
        </Button>
        <Button
          disabled={
            notInterestedMutation.isLoading || addFriendMutation.isLoading
              ? true
              : false
          }
          onClick={addFriend}
          variant={"default"}
        >
          {alreadySentTheRequest ? "Remove request" : "Add Friend"}
        </Button>
      </CardFooter>
    </Card>
  );
};

//if we are in Not Interested friends, we want to show remove NI and add friends, when we add friends, we want to remove it out of notInterested array in server and push it in await array
