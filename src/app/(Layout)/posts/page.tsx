"use client";
import { CreatePost } from "@/components/Posts/CreatePost";
import { Posts } from "@/components/Posts/Posts";
import { Container } from "@/components/ui/Container";
import useCheckAuth from "@/hooks/useCheckAuth";
import React from "react";

export default function PostsPage() {
  return (
    <Container>
      <CreatePost />
      <Posts posts={[]} />
    </Container>
  );
}
