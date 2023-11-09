"use client";
import React from "react";
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
import {
  zNotification,
  zNotifications,
  ztNotification,
} from "@/Types/Notification";

export const NotificationNav = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getnotifications"],
    queryFn: () => {
      return api
        .get<ztNotification[]>("notification", { withCredentials: true })
        .then((data) => {
          const parsedData = zNotifications.parse(data.data);
          return parsedData;
        });
    },
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " after:text-white after:w-5 after:h-5 after:absolute relative after:bg-red-500 after:-top-1 after:-right-1 after:rounded-full text-xl"
          )}
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
        {/* <object type="image/svg+xml" data="/Notification.svg"> */}
        {/*   Notification */}
        {/* </object> */}
        <Notifications notifications={data || []} />
        {/* {notificationContent}
        <SheetFooter>
          <Button onClick={() => setClearData(true)} variant={"destructive"}>
            Clear
          </Button>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
};
