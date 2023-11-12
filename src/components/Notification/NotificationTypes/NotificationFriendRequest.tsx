import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { ztNotification } from "@/Types/Notification";
import Link from "next/link";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type props = {
  notification: ztNotification;
};

export const NotificationFriendRequest = (props: props) => {
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
            <CardTitle className="text-sm md:text-xl">
              {props.notification.notificationHeader}
            </CardTitle>
            <CardDescription>
              {props.notification.notificationBody}
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter className=" flex justify-end  gap-5">
          <Button variant={"destructive"}>Decline</Button>
          <Button variant={"outline"} className="bg-green-500 text-white">
            Accept
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
