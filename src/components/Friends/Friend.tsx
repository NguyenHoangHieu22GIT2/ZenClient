"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
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
import { UserId, ztUserMinimalData } from "@/Types/User";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { imageUrl } from "@/utils/imageUrl";
import { filterReducerType } from "./NotInterestedFriends";
import { checkUsersType } from "@/utils/CheckUsersType";
import UseNotInterestedMutation from "@/apis/Friend/UseNotInterestedMutation";
import useAddFriendMutation from "@/apis/Friend/useAddFriendMutation";

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
  const notInterestedMutation = UseNotInterestedMutation();
  const addFriendMutation = useAddFriendMutation();
  function notInterested() {
    notInterestedMutation.mutate(props.user._id);
  }
  function addFriend() {
    addFriendMutation.mutate(props.user._id);
  }

  useEffect(() => {
    if (addFriendMutation.data) {
      setAlreadySentTheRequest(addFriendMutation.data.hasSent);
    }
  }, [addFriendMutation.data]);

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
      props.removeUserNotInterested(notInterestedMutation.data);
    }
  }, [notInterestedMutation.data]);
  return (
    <Card className="shadow-lg overflow-hidden rounded-lg">
      <CardHeader className="p-0 mx-auto">
        <Link href={`/users/${props.user._id}`}>
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
