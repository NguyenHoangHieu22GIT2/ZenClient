import { PropsPage } from "@/Types/PropsPage";
import { YourProfile } from "@/components/Profile/YourProfile";
import { Container } from "@/components/ui/Container";
import React from "react";

export default async function Userpage(props: PropsPage) {
  return (
    <Container>
      <YourProfile userId={props.params.id} />
    </Container>
  );
}
