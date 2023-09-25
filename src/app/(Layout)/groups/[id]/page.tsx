import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import React from "react";
import { GroupMainPage } from "@/components/Groups/Group/GroupMainPage";

export const metadata: Metadata = {
  title: "Hello",
  description: "Places where you belong",
};
export default function page() {
  return (
    <Container>
      <GroupMainPage />
    </Container>
  );
}
