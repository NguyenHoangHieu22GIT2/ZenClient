import React from "react";
import { Notification } from "./Notification";
import { Separator } from "../ui/separator";
import { ztNotification } from "@/Types/Notification";
import { NotificationFriendRequest } from "./NotificationTypes/NotificationFriendRequest";
import { NotificationAcceptFriend } from "./NotificationTypes/NotificationAcceptFriend";
import { NotificationGeneral } from "./NotificationTypes/NotificationGeneral";

type props = { notifications: ztNotification[] };

export const Notifications = (props: props) => {
  return (
    <div className="mt-5">
      {props.notifications.map((notification) => {
        if (notification.notificationType === "friend-request") {
          return (
            <NotificationFriendRequest
              notification={notification}
              key={notification._id}
            />
          );
        } else if (notification.notificationType === "accept-friend") {
          return (
            <NotificationAcceptFriend
              notification={notification}
              key={notification._id}
            />
          );
        } else {
          return (
            <NotificationGeneral
              notification={notification}
              key={notification._id}
            />
          );
        }
      })}
      <Separator />
    </div>
  );
};
// <h1 className="font-bold">Today</h1>
