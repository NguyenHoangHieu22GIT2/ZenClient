"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { zUserPage, ztUserPage } from "@/Types/User";
import { CheckImageUrl } from "@/utils/CheckImageUrl";
import { useUserStore } from "@/lib/useUserStore";
import Link from "next/link";
import useAddFriendMutation from "@/apis/Friend/useAddFriendMutation";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
type props = {
  userId: string;
};

export const UserInfos = (props: props) => {
  const { toast } = useToast();
  const addFriendMutate = useAddFriendMutation();
  const [hasSentFriendRequest, setHasSendFriendRequest] = useState(false);
  const userStore = useUserStore((state) => state.user);
  const { data, error, isLoading } = useQuery({
    queryKey: ["queryInfos"],
    queryFn: async () => {
      return api
        .get<ztUserPage>(`users/${props.userId}`, { withCredentials: true })
        .then((data) => {
          const parsedData = zUserPage.parse(data.data);
          return parsedData;
        });
    },
  });
  useEffect(() => {
    if (addFriendMutate.data) {
      setHasSendFriendRequest(addFriendMutate.data.hasSent);
      const title = addFriendMutate.data.hasSent
        ? "has Sent the request"
        : "Undo the request successfully";
      toast({
        title,
        action: <ToastAction altText="Alright">Alright</ToastAction>,
      });
    }
  }, [addFriendMutate.data]);
  if (isLoading || !data) {
    return <h1>Is Loading...</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  const user = data.user;
  const postsCount = data.postsCount;
  const friendsInfo = data.friendsInfo;

  return (
    <Card>
      <CardHeader>
        <ContextMenu>
          <ContextMenuTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="cursor-default w-full">
                  <Image
                    src={CheckImageUrl(user.avatar)}
                    width={100}
                    height={100}
                    alt="ShadCN"
                    className="mx-auto aspect-square rounded-full"
                  />
                  {/* <UserAvatarHoverCard user={user} /> */}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Right click for more options</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Block</ContextMenuItem>
            <ContextMenuItem>Unfollow</ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger>Report</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem>A Fake account</ContextMenuItem>
                <ContextMenuItem>create posts that are harmful</ContextMenuItem>
                <ContextMenuItem>Annoying to me</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        </ContextMenu>
      </CardHeader>
      <CardContent className="">
        <CardTitle className="text-center">{user.username}</CardTitle>
        <CardDescription className="text-center">
          A Person with passion to build Zen, the best social Media website
          ever!
        </CardDescription>
        <Separator className="my-5" />
        <ul>
          <li>{friendsInfo.friends.length} Friends</li>
          <li>{postsCount} Posts</li>
          <li>{friendsInfo.followers.length} Followers</li>
          <li>{friendsInfo.followings.length} Following</li>
        </ul>
      </CardContent>
      <Separator className="my-5" />
      <CardFooter className="flex gap-1 flex-wrap justify-center">
        {userStore._id !== user._id ? (
          <>
            <Button onClick={() => addFriendMutate.mutate(props.userId)}>
              {hasSentFriendRequest ? "Cancel" : "Send"} Friend Request
            </Button>
            <Button>Message</Button>
          </>
        ) : (
          <Button asChild className="md:w-full">
            <Link href="/settings">Settings</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};