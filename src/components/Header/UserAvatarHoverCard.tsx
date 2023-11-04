"use client";
import { AvatarHoverCard } from "../ui/AvatarHoverCard";
import { cookies } from "next/headers";
import jwt from "jwt-decode";
import { useUserStore } from "@/lib/useUserStore";
import { ztUser, ztUserMinimalData } from "@/Types/User";

type props = {
  user: ztUserMinimalData;
};

export function UserAvatarHoverCard(props: props) {
  return (
    <AvatarHoverCard
      username={props.user && props.user.username ? props.user.username : ""}
      avatarUrl={
        props.user
          ? props.user.avatar
            ? props.user.avatar
            : "/default-user.jpeg"
          : "/default-user.jpeg"
      }
      // avatarUrl="https://github.com/shadcn.png"
      yearOfJoined={0}
    />
  );
}
