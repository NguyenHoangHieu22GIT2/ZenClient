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
import { GroupId, zGroupQueries, zOutGroup, ztGroupQueries, ztOutGroup } from "@/Types/Group";
import { CheckImageUrl } from "@/utils/CheckImageUrl";
import { api } from "@/lib/axios.api";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import Loading from "@/app/(Layout)/loading";
import { notFound } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import jsCookie from "js-cookie";
import Modal from "@/components/uiOwnCreation/Modal";
import { ChangeAvatar } from "@/components/Settings/ChangeAvatar";
import { ContextMenuGroup } from "@radix-ui/react-context-menu";
import { ContextMenuGroupAvatar } from "./ui/ContextMenuGroup";
import { useUserStore } from "@/lib/useUserStore";
type props = {
  groupId: GroupId;
};
export const GroupInfos = ({ groupId }: props) => {
  const pathName = usePathname();
  const userId = useUserStore(state => state.user._id)
  const [openModalChangeImage, setOpenModalChangeImage] = useState(false);
  const { data, error: errorGroup, isLoading: isLoadingGroup } = useQuery({
    queryKey: ["get-group-info"],
    queryFn: async () => {
      return (
        api.get<ztGroupQueries>(
          `groups/${groupId}?userId=${jsCookie.get("userId")}`,
          {
            withCredentials: true,
          }
        )
      ).then(data => {
        const parsedData = zGroupQueries.parse(data.data)
        return parsedData
      })
    },
    retry: false,
  });

  const { mutate, error: errorOutGroup, isLoading: isLoadingOutGroup } = useMutation({
    mutationKey: ["out-group"],
    mutationFn: async (data: ztOutGroup) => {
      const parsedData = zOutGroup.parse(data);
      return api.patch("groups/out-group", parsedData, { withCredentials: true }).then(data => data)
    }
  })


  if (data) {
    const onSetOpenModalChangeImage = () => {
      if (data.userId === userId) {
        setOpenModalChangeImage(true)
      }
    }

    const outGroupMutation = () => {
      mutate({ userId, groupId: data._id })
    }
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
          <ContextMenuGroupAvatar group={data} onSetOpenModalChangeImage={onSetOpenModalChangeImage} />
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
          {!data.areYouTheHost && data.hasJoined && <Button onClick={outGroupMutation}>Out Group</Button>}
          {data.areYouTheHost && (
            <Button asChild className="md:w-full">
              <Link href={`${pathName}/settings`}>Settings</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }
  if (!isLoadingGroup) {
    notFound();
  }
  return <h1>...</h1>;
};
