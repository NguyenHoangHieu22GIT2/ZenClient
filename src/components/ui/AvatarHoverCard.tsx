"use client";
import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { PropsClassName } from "@/Types/Props";
import { imageUrl } from "@/utils/imageUrl";
import { CheckImageUrl } from "@/utils/CheckImageUrl";
import Image from "next/image";

interface props extends PropsClassName {
  avatarUrl: string;
  username: string;
  yearOfJoined: number;
}

export const AvatarHoverCard = (props: props) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar>
          <Image
            className={props.className}
            src={CheckImageUrl(props.avatarUrl)}
            width={50}
            height={50}
            alt={"Hello"}
          />
          <h1>{props.username}</h1>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-96 aspect-video  shadow-lg">
        <div className="flex justify-center items-center gap-5">
          <Image
            src={CheckImageUrl(props.avatarUrl)}
            alt={"Hello"}
            width={150}
            height={150}
            className="rounded-full aspect-square"
          />
          <div className="">
            <h4 className="font-bold">{props.username}</h4>
            <p className="text-sm text-gray-500">
              Has joined Zed {props.yearOfJoined} years ago
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
