"use client";
import { CreatePost } from "@/components/Posts/CreatePost";
import { Posts } from "@/components/Posts/Posts";
import { Fragment } from "react";

export default function Home(props: any) {
  return (
    <Fragment>
      <CreatePost />
      <Posts />
    </Fragment>
  );
}
