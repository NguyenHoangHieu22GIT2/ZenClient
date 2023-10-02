import React from "react";
import { Container } from "../ui/Container";
import { Post } from "./Post";
import { Post as PostType } from "@/Types/Post";

type props = {
  posts: PostType[];
};

export const Posts = (props: props) => {
  return (
    <div>
      {props.posts.map((post) => {
        return <Post post={post} />;
      })}
    </div>
  );
};
