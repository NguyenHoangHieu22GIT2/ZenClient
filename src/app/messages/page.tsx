import React from "react";
import { Layout } from "../_components/Layout/Layout";
import { Container } from "../_components/ui/Container";
import { FriendList } from "../_components/Messages/FriendList";
import { FriendMessages } from "../_components/Messages/FriendMessages";
import { SeparatorVertical } from "lucide-react";

export default function messagesPage() {
  return (
    <Layout>
      <Container className="mt-5">
        <main className="flex md:flex-row flex-col gap-5 h-[90vh] p-3  [&>:first-child]:basis-1/4 [&>:last-child]:basis-3/4">
          <FriendList />
          <FriendMessages />
        </main>
      </Container>
    </Layout>
  );
}
