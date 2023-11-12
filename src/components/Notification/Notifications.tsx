import React from "react";
import { Notification } from "./Notification";
import { Separator } from "../ui/separator";
import { ztNotification } from "@/Types/Notification";
import { NotificationFriendRequest } from "./NotificationTypes/NotificationFriendRequest";

type props = { notifications: ztNotification[] };

export const Notifications = (props: props) => {
  return (
    <div className="mt-5">
      {props.notifications.map((notification) => (
        <NotificationFriendRequest
          notification={notification}
          key={notification._id}
        />
      ))}
      <Separator />
    </div>
  );
};
// <h1 className="font-bold">Today</h1>
