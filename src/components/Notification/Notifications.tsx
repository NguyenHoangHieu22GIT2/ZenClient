import React, { useState } from "react";
import { Notification } from "./Notification";
import { Separator } from "../ui/separator";
import { ztNotification } from "@/Types/Notification";
import { NotificationFriendRequest } from "./NotificationTypes/NotificationFriendRequest";
import { NotificationAcceptFriend } from "./NotificationTypes/NotificationAcceptFriend";
import { NotificationGeneral } from "./NotificationTypes/NotificationGeneral";
import { NormalNotification } from "./NotificationTypes/NormalNotification";

type props = { notifications: ztNotification[] };

export const Notifications = (props: props) => {
  const [notifications, setNotifications] = useState<ztNotification[]>(
    props.notifications
  );
  return (
    <div className="mt-5">
      {notifications.map((notification) => {
        if (notification.notificationType === "friend-request") {
          return (
            <NotificationFriendRequest
              notification={notification}
              key={notification._id}
            />
          );
        } else {
          return (
            <NormalNotification
              onSetNotification={setNotifications}
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
