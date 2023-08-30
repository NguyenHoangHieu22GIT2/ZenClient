"use client";
import { CreatePost } from "@/components/Posts/CreatePost";
import { Posts } from "@/components/Posts/Posts";
import { Container } from "@/components/ui/Container";
import React from "react";

export default function PostsPage() {
  return (
    <Container>
      <CreatePost />
      <Posts />
    </Container>
  );
}
