import React from "react";
import { Post } from "./Post";
import { Post as PostType } from "@/Types/Post";

type props = {
  posts: PostType[][];
};

export const Posts = (props: props) => {
  return (
    <div>
      {props.posts.map((posts) => {
        return posts.map((post) => {
          return <Post key={post._id} post={post} />;
        });
      })}
    </div>
  );
};
