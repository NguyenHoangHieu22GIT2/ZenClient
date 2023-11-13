import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ztNotification } from "@/Types/Notification";
import Link from "next/link";

type props = {
  notification: ztNotification;
};

export const Notification = (props: props) => {
  return (
    <Link href={`users/${props.notification.options.userId?._id}`}>
      <Card className="my-2">
        <CardContent className="flex p-2 gap-2 items-center">
          <div>
            <Avatar>
              <AvatarImage src="/avatar.jpeg" alt="Avatar" />
              <AvatarFallback>
                {props.notification.options.userId?.username}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <CardTitle className="text-sm md:text-xl"></CardTitle>
            <CardDescription></CardDescription>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
