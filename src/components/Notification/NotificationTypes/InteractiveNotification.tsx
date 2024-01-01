import React, { useCallback, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { ztNotification } from "@/Types/Notification";
import Link from "next/link";
import { CardFooter } from "@/components/ui/card";
import { CheckImageUrl } from "@/utils/CheckImageUrl";

type props = {
  notification: ztNotification;
  componentCardContent?: React.JSX.Element;
  componentCardFooter?: React.JSX.Element;
  notificationHeader: string;
  notificationBody: string;
};
export const InteractiveNotification = (props: props) => {
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
        <div>
          <CardTitle className="text-sm md:text-xl">
            {props.notificationHeader}
          </CardTitle>
          <CardDescription>
            <Link
              href={`users/${props.notification.options.userId!._id}`}
              className="font-bold"
            >
              {props.notificationBody}
            </Link>
          </CardDescription>
          {props.componentCardContent}
        </div>
      </CardContent>
      <CardFooter className=" flex justify-end  gap-5">
        {props.componentCardFooter}
      </CardFooter>
    </Card>
  );
};
