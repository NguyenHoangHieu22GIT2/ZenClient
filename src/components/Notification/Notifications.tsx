import React from "react";
import { Notification } from "./Notification";
import { Heading } from "../ui/Heading";
import { Separator } from "../ui/separator";

export const Notifications = (props: {}) => {
  return (
    <div className="mt-5">
      <h1 className="font-bold">Today</h1>
      <Notification />
      <Notification />
      <Notification />
      <Notification />
      <Separator />
    </div>
  );
};
