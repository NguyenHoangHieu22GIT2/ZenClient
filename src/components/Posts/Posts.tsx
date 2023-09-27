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
        return (
          <Post
            isLiked={false}
            avatarUrl={post.user.avatar || "/default-user.jpeg"}
            username={post.user.username}
            badge="Admin"
            numOfViews={post.views}
            paragraph={post.postBody}
            heading={post.postHeading}
            dateOfPublished={post.createdAt}
            key={post._id}
            images={post.images}
          />
        );
      })}
    </div>
  );
};
