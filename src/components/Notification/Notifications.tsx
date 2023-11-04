import React from "react";
import { Notification } from "./Notification";
import { Heading } from "../ui/Heading";
import { Separator } from "../ui/separator";
import { ztNotification } from "@/Types/Notification";

type props = { notifications: ztNotification[] };

export const Notifications = (props: props) => {
  return (
    <div className="mt-5">
      <h1 className="font-bold">Today</h1>
      {props.notifications.map((notification) => (
        <Notification {...notification} key={notification._id} />
      ))}

      <Separator />
    </div>
  );
};
