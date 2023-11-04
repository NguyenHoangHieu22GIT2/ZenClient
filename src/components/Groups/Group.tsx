"use client";
import React, { useState } from "react";
import Image from "next/image";
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
import { GroupId, zGroup, ztGroup, ztGroupQueries } from "@/Types/Group";
import { CheckImageUrl } from "@/utils/CheckImageUrl";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

type props = {
  group: ztGroupQueries;
};

export const Group = ({ group }: props) => {
  const { toast } = useToast();
  const [hasJoined, setHasJoined] = useState(group.hasJoined);
  console.log(group);
  const { data, error, isLoading, mutate } = useMutation({
    mutationKey: ["joinGroup"],
    mutationFn: () => {
      return api
        .patch<ztGroup>(
          "groups/join-group",
          { groupId: group._id },
          { withCredentials: true }
        )
        .then((data) => {
          const parsedData = zGroup.parse(data.data);
          setHasJoined((oldBool) => !oldBool);
          return parsedData;
        })
        .catch((err) => {
          console.log(err);
          return toast({
            title: "Error!",
            description: "Something went wrong in the server :(",
            action: <ToastAction altText="alright">Alright</ToastAction>,
          });
        });
    },
  });

  function joinGroup() {
    mutate();
    //TODO:Send back to server the userId so that the server can send a friend request
  }
  return (
    <Card className="shadow-lg overflow-hidden rounded-lg">
      <CardHeader className="p-0 mx-auto">
        <Link href={`/groups/${group._id}`}>
          <Image
            className="mx-auto"
            src={CheckImageUrl(group.groupAvatar)}
            alt="asd"
            width={500}
            height={500}
          />
        </Link>
      </CardHeader>
      <CardContent className="mt-5">
        <CardTitle>{group.groupName}</CardTitle>
        <CardDescription className="w-32 whitespace-nowrap overflow-hidden text-ellipsis">
          {group.groupDescription}
        </CardDescription>
      </CardContent>
      <CardFooter className="float-right">
        {/* <Button onClick={notInterested} variant={"ghost"}>
          Not interested
        </Button> */}
        <Button disabled={isLoading} onClick={joinGroup} variant={"default"}>
          {hasJoined ? "Undo Join" : "Join Group"}
        </Button>
      </CardFooter>
    </Card>
  );
};
