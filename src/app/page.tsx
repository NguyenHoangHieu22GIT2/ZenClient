"use client";
import { Header } from "@/components/Layout/Header";
import { Layout } from "@/components/Layout/Layout";
import { CreatePost } from "@/components/Posts/CreatePost";
import { Posts } from "@/components/Posts/Posts";
export default function Home() {
  return (
    <>
      <CreatePost />
      <Posts />
    </>
  );
}
