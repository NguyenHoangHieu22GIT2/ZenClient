"use client";
import { Friend } from "@/app/_components/Friends/Friend";
import { Friends } from "@/app/_components/Friends/Friends";
import { Layout } from "@/app/_components/Layout/Layout";
import { Heading } from "@/app/_components/ui/Heading";
import { Container } from "@/app/_components/ui/Container";
import React from "react";
import { FriendFilter } from "@/app/_components/Friends/FriendFilter";

export default function page() {
  return (
    <Container className="mt-3">
      <Heading className="mb-2 lg:text-lg font-bold">
        Friends you may know!
      </Heading>
      <div className="flex md:flex-row flex-col gap-2 [&>*:first-child]:basis-1/4 [&>*:last-child]:basis-3/4">
        <FriendFilter />
        <Friends />
      </div>
    </Container>
  );
}
