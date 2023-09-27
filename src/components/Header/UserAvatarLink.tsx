"use client";
import Link from "next/link";
import { AvatarHoverCard } from "../ui/AvatarHoverCard";
import { useAuthStore } from "@/lib/storeZustand";

export function UserAvatarLink() {
  const user = useAuthStore((state) => state);
  return (
    <Link href={user.access_token ? `/users/${user._id}` : "/login"}>
      <AvatarHoverCard
        username="User"
        avatarUrl={
          user.access_token
            ? user.avatar
              ? user.avatar
              : "/default-user.jpeg"
            : "/default-user.jpeg"
        }
        // avatarUrl="https://github.com/shadcn.png"
        yearOfJoined={0}
      />
    </Link>
  );
}
