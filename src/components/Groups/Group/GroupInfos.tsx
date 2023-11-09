"use client";
import React, { Suspense, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import Image from "next/image";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
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
import { GroupId, zGroupQueries, ztGroupQueries } from "@/Types/Group";
import { CheckImageUrl } from "@/utils/CheckImageUrl";
import { api } from "@/lib/axios.api";
import { useQueries, useQuery } from "@tanstack/react-query";
import Loading from "@/app/(Layout)/loading";
import { notFound } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import jsCookie from "js-cookie";
import Modal from "@/components/uiOwnCreation/Modal";
import { ChangeAvatar } from "@/components/Settings/ChangeAvatar";
type props = {
  groupId: GroupId;
};
export const GroupInfos = ({ groupId }: props) => {
  const pathName = usePathname();
  const [openModalChangeImage, setOpenModalChangeImage] = useState(false);
  const { data, error, isLoading } = useQuery({
    queryKey: ["get-group-info"],
    queryFn: async () => {
      return (
        await api.get<ztGroupQueries>(
          `groups/${groupId}?userId=${jsCookie.get("userId")}`,
          {
            withCredentials: true,
          }
        )
      ).data;
    },
    retry: false,
  });
  if (data)
    return (
      <Card>
        {openModalChangeImage && (
          <Modal
            className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-2/4 aspect-video"
            onClose={() => setOpenModalChangeImage(false)}
          >
            <ChangeAvatar
              url={`/groups/${groupId}/change-avatar`}
              imageUrl={data.groupAvatar}
            />
          </Modal>
        )}
        <CardHeader>
          <ContextMenu>
            <ContextMenuTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    onClick={() => setOpenModalChangeImage(true)}
                    className="cursor-default w-full"
                  >
                    <Image
                      src={CheckImageUrl(data.groupAvatar)}
                      width={100}
                      height={100}
                      alt={data.groupName}
                      className="mx-auto rounded-full aspect-square cursor-pointer"
                    />
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
                  <ContextMenuItem>
                    create posts that are harmful
                  </ContextMenuItem>
                  <ContextMenuItem>Annoying to me</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
            </ContextMenuContent>
          </ContextMenu>
        </CardHeader>
        <CardContent className="">
          <CardTitle className="text-center">{data.groupName}</CardTitle>
          <CardDescription className="text-center">
            {data.groupDescription}
          </CardDescription>
          <Separator className="my-5" />
          <ul>
            <li>{data.userIds.length} Members</li>
            <li>{data.postIds.length} Posts</li>
            <li>9 Events</li>
            <li>{data.isPrivate ? "private" : "public"}</li>
          </ul>
        </CardContent>
        <Separator className="my-5" />
        <CardFooter className="flex gap-1 flex-wrap justify-center">
          {!data.hasJoined && <Button>Join Group</Button>}
          {!data.areYouTheHost && data.hasJoined && <Button>Out Group</Button>}
          {data.areYouTheHost && (
            <Button asChild className="md:w-full">
              <Link href={`${pathName}/settings`}>Settings</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  if (!isLoading) {
    notFound();
  }
  return <h1>...</h1>;
};
