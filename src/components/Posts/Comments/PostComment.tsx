import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { FormEvent, useState } from "react";
import { AvatarHoverCard } from "@/components/ui/AvatarHoverCard";
import { useMutation } from "@tanstack/react-query";
import {
  CommentId,
  ztCommentType,
  PostId,
  ztReplyType,
  zCommentType,
} from "@/Types/Post";
import { api } from "@/lib/axios.api";
import { useUserStore } from "@/lib/useUserStore";

type props = {
  onAddComment?: (comment: ztCommentType) => void;
  onAddReply?: (comment: ztReplyType) => void;
  postId: PostId;
  commentId?: CommentId;
};

export const PostComment = (props: props) => {
  const user = useUserStore((state) => state.user);
  const { mutate, isLoading, error } = useMutation({
    mutationKey: ["post/comments"],
    mutationFn: async (data: {
      postId: PostId;
      comment: string;
      commentId?: CommentId;
    }) => {
      return api
        .post<ztCommentType>(
          process.env.NEXT_PUBLIC_SERVER_CREATE_COMMENT,
          data,
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          console.log(result.data);
          const parsedData = zCommentType.parse(result.data);
          if (props.onAddComment) {
            props.onAddComment({
              _id: parsedData._id,
              user: {
                username: parsedData.user.username,
                avatar: parsedData.user.avatar || "/default-user.jpeg",
              },
              comment: data.comment,
              replies: parsedData.replies,
              userId: parsedData.userId,
              repliesCount: 0,
            });
          } else if (props.onAddReply) {
            props.onAddReply({
              _id: parsedData._id,
              user: {
                username: parsedData.user.username,
                avatar: parsedData.user.avatar || "/default-user.jpeg",
              },
              comment: parsedData.comment,
              userId: parsedData.userId,
            });
          }

          return parsedData;
        });
    },
  });
  const [value, setValue] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    if (value.trim().length <= 0) {
      return;
    }
    if (props.commentId) {
      mutate({
        postId: props.postId,
        comment: value,
        commentId: props.commentId,
      });
    } else {
      mutate({
        postId: props.postId,
        comment: value,
      });
    }
  }
  return (
    <form onSubmit={submit} className="flex gap-2">
      <AvatarHoverCard
        avatarUrl={user.avatar || "/default-user.jpeg"}
        username={user.username}
        yearOfJoined={4}
      />
      <Input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Share your thoughts"
      />
      <Button disabled={isLoading ? true : false}>Post</Button>
    </form>
  );
};
