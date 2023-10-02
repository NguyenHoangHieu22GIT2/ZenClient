"use client";
import { useAuthStore } from "@/lib/storeZustand";
import { AvatarHoverCard } from "../ui/AvatarHoverCard";
import { cookies } from "next/headers";
import jwt from "jwt-decode";
import { jwtCookieToObject } from "@/utils/jwtCookieToObject";
import { useEffect, useState } from "react";
import { useUserFromZustandClient } from "@/hooks/useUserFromZustandClient";

export function UserAvatarHoverCard() {
  const { user } = useUserFromZustandClient();

  return (
    <AvatarHoverCard
      username={user && user.username ? user.username : ""}
      avatarUrl={user && user.avatar ? user.avatar : "/default-user.jpeg"}
      // avatarUrl="https://github.com/shadcn.png"
      yearOfJoined={0}
    />
  );
}
