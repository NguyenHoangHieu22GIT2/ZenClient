import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import React, { FormEvent, useState } from "react";
import { CommentType } from "./Comment";
import { AvatarHoverCard } from "@/app/_components/ui/AvatarHoverCard";

type props = {
  onAddComment: (comment: CommentType) => void;
};

export const PostComment = (props: props) => {
  const [value, setValue] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    props.onAddComment({
      _id: Math.random().toString(),
      username: "ShadCn",
      paragraph: value,
      avatarUrl: "https://github.com/shadcn.png",
    });
  }
  return (
    <form onSubmit={submit} className="flex gap-2">
      <AvatarHoverCard
        avatarUrl="/avatar.jpeg"
        username="Shadn"
        yearOfJoined={4}
      />
      <Input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Share your thoughts"
      />
      <Button>Post</Button>
    </form>
  );
};
