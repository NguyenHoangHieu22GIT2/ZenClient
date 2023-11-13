import React, { useCallback, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { ztNotification } from "@/Types/Notification";
import Link from "next/link";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckImageUrl } from "@/utils/CheckImageUrl";
import useDeclineFriendRequest from "@/apis/Friend/useDeclineFriendRequest";
import useAcceptFriendRequest from "@/apis/Friend/useAcceptFriendRequest";

type props = {
  notification: ztNotification;
};

export const NotificationAcceptFriend = (props: props) => {
  return (
    // <Link href={`users/${props.notification.options.userId?._id}`}>
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
        <div>
          <CardTitle className="text-sm md:text-xl">
            Accepted Friend Request
          </CardTitle>
          <CardDescription>
            {props.notification.options.userId!.username} has accepted your
            request
          </CardDescription>
        </div>
      </CardContent>
    </Card>
    // </Link>
  );
};
