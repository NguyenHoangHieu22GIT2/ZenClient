import React, { useCallback, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Link from "next/link";
import { CheckImageUrl } from "@/utils/CheckImageUrl";
import { ztNotification } from "@/Types/Notification";

type props = {
  notification: ztNotification;
};
export const NormalNotification = (props: props) => {
  return (
    <Card className="my-2">
      <CardContent className="flex p-2 gap-2 items-center">
        <div>
          <Link href={`users/${props.notification.options.userId!._id}`}>
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
            <CardDescription className="italic  bg-slate-200 p-1">
              {props.notification.notificationBody}
            </CardDescription>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
