import React from "react";
import { Layout } from "@/components/Layout/Layout";
import { Container } from "@/components/ui/Container";
import { FriendList } from "@/components/Messages/FriendList";
import { FriendMessages } from "@/components/Messages/FriendMessages";
import { SeparatorVertical } from "lucide-react";
import useCheckAuth from "@/hooks/useCheckAuth";

export default async function messagesPage() {
  return (
    <Container className="mt-5">
      <main className="flex md:flex-row flex-col gap-5 h-[90vh] p-3  [&>:first-child]:basis-1/4 [&>:last-child]:basis-3/4">
        <FriendList />
        <FriendMessages />
      </main>
    </Container>
  );
}
