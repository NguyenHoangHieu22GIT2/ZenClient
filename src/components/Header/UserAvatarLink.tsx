"use client";
import Link from "next/link";
import { AvatarHoverCard } from "../ui/AvatarHoverCard";
import { useAuthStore } from "@/lib/storeZustand";
import { cookies } from "next/headers";
import { useUserFromZustandClient } from "@/hooks/useUserFromZustandClient";

export function UserAvatarLink() {
  const { user } = useUserFromZustandClient();
  return (
    <Link href={user && user._id ? `/users/${user._id}` : "/login"}>
      <AvatarHoverCard
        username="User"
        avatarUrl={user && user.avatar ? user.avatar : "/default-user.jpeg"}
        // avatarUrl="https://github.com/shadcn.png"
        yearOfJoined={0}
      />
    </Link>
  );
}
