"use client";
import { Fragment, useState } from "react";
import { CreatePost } from "./CreatePost";
import { Posts } from "./Posts";
import { Post } from "@/Types/Post";

type props = {
  posts: Post[];
};

export function FullPost(props: props) {
  const [posts, setPosts] = useState<Post[]>(props.posts);
  function createPost(post: Post) {
    setPosts((oldPosts) => [post, ...oldPosts]);
  }

  return (
    <Fragment>
      <CreatePost onCreatePost={createPost} />
      <Posts posts={posts} />
    </Fragment>
  );
}
