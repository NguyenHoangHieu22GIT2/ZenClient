import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { AvatarHoverCard } from "@/app/_components/ui/AvatarHoverCard";
import { Button } from "@/app/_components/ui/button";
import { Heading } from "@/app/_components/ui/Heading";
import { Paragraph } from "@/app/_components/ui/Paragraph";
import { Username } from "@/app/_components/ui/Username";
import React from "react";
import { BiDownArrowAlt } from "react-icons/bi";

export type CommentType = {
  _id: string;
  avatarUrl: string;
  username: string;
  paragraph: string;
};

export const Comment = (props: CommentType) => {
  return (
    <div className="border rounded-lg shadow-sm p-2 dark:bg-slate-800 bg-slate-100">
      <div className="flex gap-2 items-center">
        <AvatarHoverCard
          username={props.username}
          avatarUrl={props.avatarUrl}
          yearOfJoined={4}
        />
        <Username>{props.username}</Username>
      </div>
      <p className="font-normal leading-7">{props.paragraph}</p>
      {/* <Paragraph>{props.paragraph}</Paragraph> */}
      <div>
        <Button variant={"outline"} className="px-2 py-1 float-right">
          <BiDownArrowAlt />
          Replies
        </Button>
      </div>
    </div>
  );
};
