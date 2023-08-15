import React from "react";
import { Container } from "../ui/Container";
import { Post } from "./Post";

export const Posts = (props: {}) => {
  return (
    <div>
      <Post
        isLiked={true}
        avatarUrl="https://github.com/shadcn.png"
        username="ShadCn"
        badge="Admin"
        numOfViews={499}
        paragraph="This is a good day to code a beautiful website like Poddy"
        heading="Best day to Code!"
        dateOfPublished={new Date()}
        key={1}
      />
    </div>
  );
};
