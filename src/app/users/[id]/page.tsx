"use client";
import { YourProfile } from "@/components/Profile/YourProfile";
import { Container } from "@/components/ui/Container";
import useCheckAuth from "@/hooks/useCheckAuth";
import { useAuthStore } from "@/lib/storeZustand";
import React from "react";

export default function Userpage() {
  const token = useAuthStore((state) => state.access_token);
  useCheckAuth(token);
  return (
    <Container>
      <YourProfile />
    </Container>
  );
}
