"use client";
import { Header } from "@/app/_components/Layout/Header";
import { Layout } from "@/app/_components/Layout/Layout";
import { CreatePost } from "@/app/_components/Posts/CreatePost";
import { Posts } from "@/app/_components/Posts/Posts";

export default function Home() {
  return (
    <Layout>
      <CreatePost />
      <Posts />
    </Layout>
  );
}
