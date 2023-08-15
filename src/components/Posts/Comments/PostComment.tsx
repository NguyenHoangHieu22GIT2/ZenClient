import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { FormEvent, useState } from "react";
import { CommentType } from "./Comment";

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
      <Input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Share your thoughts"
      />
      <Button>Post</Button>
    </form>
  );
};
