import { YourProfile } from "@/components/Profile/YourProfile";
import { Container } from "@/components/ui/Container";
import useCheckAuth from "@/hooks/useCheckAuth";
import { useAuthStore } from "@/lib/storeZustand";
import React from "react";

export default async function Userpage() {
  return (
    <Container>
      <YourProfile />
    </Container>
  );
}
