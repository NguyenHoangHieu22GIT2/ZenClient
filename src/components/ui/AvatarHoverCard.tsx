import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { PropsClassName } from "@/Types/Props";

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
          <AvatarImage className={props.className} src={props.avatarUrl} />
          <AvatarFallback>{props.username}</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-56 shadow-lg">
        <div className="flex justify-between space-x-2 ">
          <Avatar>
            <AvatarImage src={props.avatarUrl} />
            <AvatarFallback>{props.username}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="font-bold">{props.username}</h4>
            <p className="text-sm text-gray-500">
              Has joined Poddy {props.yearOfJoined} years ago
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
