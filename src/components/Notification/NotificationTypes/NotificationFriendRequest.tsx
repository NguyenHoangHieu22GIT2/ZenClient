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

type Action = "accept" | "decline" | "waiting";

export const NotificationFriendRequest = (props: props) => {
  const [hasAction, setHasAction] = useState<Action>("waiting");
  const declineFriendRequest = useDeclineFriendRequest();
  const acceptFriendRequesst = useAcceptFriendRequest();
  const declineMutate = useCallback(() => {
    declineFriendRequest.mutate({
      userId: props.notification.options.userId!._id,
      notificationId: props.notification._id,
    });
    setHasAction("decline");
  }, []);
  const acceptMutate = useCallback(() => {
    acceptFriendRequesst.mutate({
      userId: props.notification.options.userId!._id,
      notificationId: props.notification._id,
    });
    setHasAction("accept");
  }, []);
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
          <CardTitle className="text-sm md:text-xl">Friend Request</CardTitle>
          <CardDescription>
            <Link
              href={`users/${props.notification.options.userId!._id}`}
              className="font-bold"
            >
              {props.notification.options.userId!.username}
            </Link>{" "}
            Has sent you a friend request
          </CardDescription>
          {hasAction === "decline" && (
            <i>You have Declined this friend requesst</i>
          )}
          {hasAction === "accept" && (
            <i>You have accepted this friend requesst</i>
          )}
        </div>
      </CardContent>
      <CardFooter className=" flex justify-end  gap-5">
        {hasAction === "waiting" && (
          <>
            <Button onClick={declineMutate} variant={"destructive"}>
              Decline
            </Button>
            <Button
              onClick={acceptMutate}
              variant={"outline"}
              className="bg-green-500 text-white"
            >
              Accept
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
    // </Link>
  );
};
