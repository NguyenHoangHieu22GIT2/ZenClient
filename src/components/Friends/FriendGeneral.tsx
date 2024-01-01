"use client";
import Image from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { UserId, ztUserMinimalData } from "@/Types/User";
import { imageUrl } from "@/utils/imageUrl";

type props = {
  user: ztUserMinimalData;
  addons: (args: Record<any, any>) => React.JSX.Element;
  onSetUsers: React.Dispatch<React.SetStateAction<ztUserMinimalData[]>>;
};

export const FriendGeneral = React.memo((props: props) => {
  return (
    <Card className="shadow-lg overflow-hidden rounded-lg">
      <CardHeader className="p-0 mx-auto">
        <Link href={`/users/${props.user._id}`}>
          <Image
            className="mx-auto aspect-square"
            src={
              props.user.avatar ? imageUrl(props.user.avatar) : "/avatar.jpeg"
            }
            alt={props.user.username}
            width={500}
            height={500}
          />
        </Link>
      </CardHeader>
      <CardContent className="mt-5">
        <CardTitle>{props.user.username}</CardTitle>
        <CardDescription>{props.user.email}</CardDescription>
      </CardContent>
      <CardFooter className="grid grid-cols-2">
        {props.addons(props)}
      </CardFooter>
    </Card>
  );
});
