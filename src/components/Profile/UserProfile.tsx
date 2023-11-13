"use client";
import React from "react";
import { UserInfos } from "./UserInfos";
import { UserActions } from "./UserActions";
import { UserGroups } from "./UserGroups";
import { Posts } from "../Posts/Posts";

type props = {
  userId: string;
};

export const UserProfile = async (props: props) => {
  return (
    <>
      <section className="md:flex md:items-start  mt-5 gap-2 [&>*:first-child]:basis-3/12  [&>*:nth-child(2)]:basis-5/12 [&>*:last-child]:basis-4/12">
        <UserInfos userId={props.userId} />
        <UserActions />
        <UserGroups userId={props.userId} />
      </section>
      <Posts url={`posts/get-user-posts/${props.userId}`} />
    </>
  );
};
