import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Link from "next/link";
import { CheckImageUrl } from "@/utils/CheckImageUrl";
import { NotificationId, ztNotification } from "@/Types/Notification";
import { Button } from "@/components/ui/button";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useMutationDeleteNotification } from "@/apis/Notification/Delete-Notification";
type props = {
  notification: ztNotification;
  onSetNotification: React.Dispatch<React.SetStateAction<ztNotification[]>>;
};
export const NormalNotification = React.memo((props: props) => {
  const deleteNotificationMutation = useMutationDeleteNotification();
  useEffect(() => {
    if (deleteNotificationMutation.data) {
      props.onSetNotification((oldNotifications) => {
        return oldNotifications.filter(
          (notification) => notification._id !== props.notification._id
        );
      });
    }
  }, [deleteNotificationMutation.data]);
  return (
    <Card className="my-2 group border-none">
      <CardContent className="flex bg-white group-hover:bg-slate-100 rounded-md transition relative px-2 py-4 gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className={cn("absolute right-3 top-1/2 -translate-y-1/2")}>
              <Button
                variant={"outline"}
                className="rounded-full w-10 group-hover:bg-slate-100 group-hover:shadow-lg aspect-square"
              >
                <div className="w-32">
                  <HiOutlineDotsHorizontal />
                </div>
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                deleteNotificationMutation.mutate(props.notification._id)
              }
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem>Toggle Read</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="">
          <Link href={`/users/${props.notification.options.userId!._id}`}>
            <Avatar>
              <AvatarImage
                src={CheckImageUrl(props.notification.options.userId!.avatar)}
                alt="Avatar"
              />
              <AvatarFallback>
                {props.notification.options.userId!.username}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <Link href={"/posts/" + props.notification.options.link!}>
          <div>
            <CardTitle className="text-sm md:text-xl">
              {props.notification.notificationHeader}
            </CardTitle>
            <CardDescription className="italic rounded-lg bg-slate-200 p-1">
              {props.notification.notificationBody}
            </CardDescription>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
});
