import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { FormEvent, useState } from "react";
import { AvatarHoverCard } from "@/components/ui/AvatarHoverCard";
import { useMutation } from "@tanstack/react-query";
import { CommentId, CommentType, PostId, ReplyType } from "@/Types/Post";
import { Bearer } from "@/utils/Bearer";
import { useAuthStore } from "@/lib/storeZustand";
import { api } from "@/lib/axios.api";

type props = {
  onAddComment?: (comment: CommentType) => void;
  onAddReply?: (comment: ReplyType) => void;
  postId: PostId;
  commentId?: CommentId;
};

export const PostComment = (props: props) => {
  console.log(props);
  const user = useAuthStore((state) => state);
  const { mutate, isLoading, error } = useMutation({
    mutationKey: ["post/comments"],
    mutationFn: async (data: {
      postId: PostId;
      comment: string;
      commentId?: CommentId;
    }) => {
      console.log(data);
      return api
        .post(process.env.NEXT_PUBLIC_SERVER_CREATE_COMMENT, data, {
          headers: {
            authorization: Bearer(user.access_token),
          },
        })
        .then((result) => {
          const data: CommentType = result.data;
          if (props.onAddComment) {
            props.onAddComment({
              _id: data._id,
              user: {
                username: data.user.username,
                avatar: data.user.avatar || "./default-user.jpeg",
              },
              comment: data.comment,
              replies: data.replies,
              userId: data.userId,
              repliesCount: 0,
            });
          } else if (props.onAddReply) {
            props.onAddReply({
              _id: data._id,
              user: {
                username: data.user.username,
                avatar: data.user.avatar || "./default-user.jpeg",
              },
              comment: data.comment,
              userId: data.userId,
            });
          }

          return result;
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
        avatarUrl={user.avatar || "./default-user.jpeg"}
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
