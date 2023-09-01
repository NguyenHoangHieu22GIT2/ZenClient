"use client";
import { Header } from "@/components/Layout/Header";
import { Layout } from "@/components/Layout/Layout";
import { CreatePost } from "@/components/Posts/CreatePost";
import { Posts } from "@/components/Posts/Posts";
import useCheckAuth from "@/hooks/useCheckAuth";
import { Fragment } from "react";
export default function Home() {
  return (
    <Fragment>
      <CreatePost />
      <Posts />
    </Fragment>
  );
}
