import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarHoverCard } from "@/components/ui/AvatarHoverCard";
import { Heading } from "@/components/ui/Heading";
import { Paragraph } from "@/components/ui/Paragraph";
import { Username } from "@/components/ui/Username";
import React from "react";

export type CommentType = {
  _id: string;
  avatarUrl: string;
  username: string;
  paragraph: string;
};

export const Comment = (props: CommentType) => {
  return (
    <div className="">
      <div className="flex gap-2 items-center">
        <AvatarHoverCard
          username={props.username}
          avatarUrl={props.avatarUrl}
          yearOfJoined={4}
        />
        <Username>{props.username}</Username>
      </div>
      <Paragraph>{props.paragraph}</Paragraph>
    </div>
  );
};
