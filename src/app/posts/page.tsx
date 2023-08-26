"use client";
import { CreatePost } from "@/app/_components/Posts/CreatePost";
import { Posts } from "@/app/_components/Posts/Posts";
import { Container } from "@/app/_components/ui/Container";
import React from "react";

export default function PostsPage() {
  return (
    <Container>
      <CreatePost />
      <Posts />
    </Container>
  );
}
