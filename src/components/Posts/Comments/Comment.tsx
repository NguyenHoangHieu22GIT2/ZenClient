import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarHoverCard } from "@/components/ui/AvatarHoverCard";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Heading";
import { Paragraph } from "@/components/ui/Paragraph";
import { Username } from "@/components/ui/Username";
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
