import { YourProfile } from "@/components/Profile/YourProfile";
import { Container } from "@/components/ui/Container";
import React from "react";

export default async function Userpage(props: any) {
  return (
    <Container>
      <YourProfile userId={props.params.id} />
    </Container>
  );
}
