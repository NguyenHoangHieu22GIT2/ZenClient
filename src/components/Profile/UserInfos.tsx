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
import { UserId } from "@/Types/User";
import { CheckImageUrl } from "@/utils/CheckImageUrl";
import { useUserStore } from "@/lib/useUserStore";
import Link from "next/link";
import useAddFriendMutation from "@/apis/Friend/useAddFriendMutation";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import useFollowUserMutation from "@/apis/Friend/useFollowUserMutation";
import { useQueryUserInfos } from "@/apis/User/useQueryUserInfos";
import { Skeleton } from "../ui/skeleton";
type props = {
  userId: UserId;
};

export const UserInfos = React.memo((props: props) => {
  const { toast } = useToast();
  const addFriendMutate = useAddFriendMutation();
  const followUserMutate = useFollowUserMutation();
  const [hasSentFriendRequest, setHasSendFriendRequest] = useState(false);
  const userInfosQuerys = useQueryUserInfos(props.userId);
  const userStore = useUserStore((state) => state.user);
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
  }, [addFriendMutate.data, toast]);
  if (userInfosQuerys.isLoading || !userInfosQuerys.data) {
    return <Skeleton className="w-3 h-96 rounded-sm basis-3/12"></Skeleton>;
  }

  if (userInfosQuerys.error) {
    return <h1>Error</h1>;
  }

  const user = userInfosQuerys.data.user;
  const postsCount = userInfosQuerys.data.postsCount;
  const friendsInfo = userInfosQuerys.data.friendsInfo;

  let isFollowed =
    followUserMutate.data || userInfosQuerys.data.friendsInfo.isFollowing;

  return (
    <Card className="basis-3/12">
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
          {user.description}
        </CardDescription>
        <Separator className="my-5" />
        <ul>
          <li>{friendsInfo.friends} Friends</li>
          <li>{postsCount} Posts</li>
          <li>{friendsInfo.followers} Followers</li>
          <li>{friendsInfo.followings} Following</li>
        </ul>
      </CardContent>
      <Separator className="my-5" />
      <CardFooter className="flex gap-1 flex-wrap justify-center">
        {userStore._id !== user._id ? (
          <>
            {!friendsInfo.isFriend ? (
              <Button onClick={() => addFriendMutate.mutate(props.userId)}>
                {hasSentFriendRequest ? "Cancel" : "Send"} Friend Request
              </Button>
            ) : (
              <Button>Unfriend</Button>
            )}
            <Button>Message</Button>
            <Button
              onClick={() => followUserMutate.mutate(props.userId)}
              disabled={followUserMutate.isLoading}
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </Button>
          </>
        ) : (
          <Button asChild className="md:w-full">
            <Link href="/settings">Settings</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
});
