"use client";
import { AvatarHoverCard } from "../ui/AvatarHoverCard";
import { ztUserMinimalData } from "@/Types/User";

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
