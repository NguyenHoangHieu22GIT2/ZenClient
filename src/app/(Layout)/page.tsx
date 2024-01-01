"use client";
import { CreatePost } from "@/components/Posts/CreatePost";
import { Posts } from "@/components/Posts/Posts";
import { Fragment } from "react";
export default function Home() {
  return (
    <Fragment>
      <CreatePost />
      <Posts inifiteScroll={true} url="posts/get-posts" />
    </Fragment>
  );
}
