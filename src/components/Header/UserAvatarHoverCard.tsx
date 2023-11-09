"use client";
import { AvatarHoverCard } from "../ui/AvatarHoverCard";
import { cookies } from "next/headers";
import jwt from "jwt-decode";
import { useUserStore } from "@/lib/useUserStore";
import { ztUser, ztUserMinimalData } from "@/Types/User";
import { CheckImageUrl } from "@/utils/CheckImageUrl";

type props = {
  user: ztUserMinimalData;
};

export function UserAvatarHoverCard(props: props) {
  return (
    <AvatarHoverCard
      username={props.user && props.user.username ? props.user.username : ""}
      avatarUrl={props.user.avatar}
      // avatarUrl="https://github.com/shadcn.png"
      yearOfJoined={0}
    />
  );
}
