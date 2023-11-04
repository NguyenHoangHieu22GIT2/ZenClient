import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import React from "react";
import { GroupMainPage } from "@/components/Groups/Group/GroupMainPage";
import { Props } from "@/Types/PropsPage";

export const metadata: Metadata = {
  title: "Hello",
  description: "Places where you belong",
};
export default function page(props: Props) {
  return (
    <Container>
      <GroupMainPage groupId={props.params.id} />
    </Container>
  );
}
