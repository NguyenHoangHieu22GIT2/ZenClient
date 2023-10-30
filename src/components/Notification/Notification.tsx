import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Notification as NotificationType } from "@/Types/Notification";
import Link from "next/link";

type props = NotificationType;

export const Notification = (props: props) => {
  return (
    <Link href={`users/${props.options.userId?._id}`}>
      <Card className="my-2">
        <CardContent className="flex p-2 gap-2 items-center">
          <div>
            <Avatar>
              <AvatarImage src="/avatar.jpeg" alt="Avatar" />
              <AvatarFallback>{props.options.userId?.username}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <CardTitle className="text-sm md:text-xl">
              {props.notificationHeader}
            </CardTitle>
            <CardDescription>{props.notificationBody}</CardDescription>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
