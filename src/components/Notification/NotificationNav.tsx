"use client";
import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Notifications } from "./Notifications";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { zNotifications, ztNotifications } from "@/Types/Notification";
import { propagateServerField } from "next/dist/server/lib/render-server";

export const NotificationNav = () => {
  //this is for when you click the notification bell
  //it will fetch the notifications
  //by default it will fetch no matter what which is very costy if people don't want to look at their noti but it helps that user can actually see if they have any notifications that they have not read. so it's meh, good or bad, you decide here.
  // UPDATE: using socketConversations.io to change the way we receive notifications
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["getnotifications"],
    queryFn: async () => {
      return api
        .get<ztNotifications>("notifications", { withCredentials: true })
        .then((result) => {
          const parsedData = zNotifications.parse(result.data);
          return parsedData;
        });
    },
  });

  if (isLoading || !data) {
    return <h1>Loading...</h1>;
  } else if (error) {
    return <h1>Error Going on </h1>;
  }

  let notificationBubble = "";

  for (let i = 0; i < data.length; i++) {
    let notification = data[i];
    if (!notification.hasSeen) {
      notificationBubble =
        "after:text-white after:w-5 after:h-5 after:absolute after:bg-red-500 after:-top-1 after:-right-1 after:rounded-full";
      break;
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("relative text-xl", notificationBubble)}
          onClick={() => refetch()}
        >
          <IoMdNotifications />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            Don{"'"}t miss out any important event!!!
          </SheetDescription>
        </SheetHeader>
        {/*This is new for me, Using object tag to ship SVG*/}
        {data.length === 0 && (
          <object type="image/svg+xml" data="/Notification.svg">
            Notification
          </object>
        )}
        <Notifications notifications={data || []} />
      </SheetContent>
    </Sheet>
  );
};
// <SheetFooter>
//   <Button onClick={() => setClearData(true)} variant={"destructive"}>
//     Clear
//   </Button>
// </SheetFooter>
