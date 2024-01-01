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
import { InteractiveNotification } from "./InteractiveNotification";

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
    <InteractiveNotification
      notificationHeader={props.notification.notificationHeader}
      notificationBody={props.notification.notificationBody}
      notification={props.notification}
      componentCardContent={
        hasAction === "accept" ? (
          <h1>You have accepted the request</h1>
        ) : hasAction === "decline" ? (
          <h1>You have declined the request</h1>
        ) : (
          <></>
        )
      }
      componentCardFooter={
        hasAction === "waiting" ? (
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
        ) : (
          <></>
        )
      }
    />
  );
};
