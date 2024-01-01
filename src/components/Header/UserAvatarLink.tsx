"use client";
import Link from "next/link";
import { AvatarHoverCard } from "../ui/AvatarHoverCard";
import { ztUserMinimalDataOmitEmail } from "@/Types/Post";
import { ztUserMinimalData } from "@/Types/User";

type props = {
  user: ztUserMinimalData | ztUserMinimalDataOmitEmail;
};

export function UserAvatarLink(props: props) {
  return (
    <Link
      href={
        props.user && props.user._id ? `/users/${props.user._id}` : "/login"
      }
    >
      <AvatarHoverCard
        username={props.user.username}
        avatarUrl={props.user.avatar}
        // avatarUrl="https://github.com/shadcn.png"
        yearOfJoined={0}
      />
    </Link>
  );
}
