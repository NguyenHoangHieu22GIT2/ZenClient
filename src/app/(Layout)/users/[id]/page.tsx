import { PropsPage } from "@/Types/PropsPage";
import { UserProfile } from "@/components/Profile/UserProfile";
import { Container } from "@/components/ui/Container";
import React from "react";

export default async function Userpage(props: PropsPage) {
  return (
    <Container>
      <UserProfile userId={props.params.id} />
    </Container>
  );
}
