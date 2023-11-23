"use client";
import React, { useState } from "react";
import { UserInfos } from "./UserInfos";
import { UserActions } from "./UserActions";
import { UserGroups } from "./UserGroups";
import { Posts } from "../Posts/Posts";
import Users from "../Users/Users";
import { useUserStore } from "@/lib/useUserStore";
import Information from "./Information";
import { UserId } from "@/Types/User";

type props = {
  userId: UserId;
};

export type Tab = "posts" | "friends" | "information";
export const UserProfile = (props: props) => {
  const userId = useUserStore((state) => state.user._id);
  const [tab, setTab] = useState<Tab>("posts");
  let mainElement = (
    <Posts inifiteScroll={false} url={`posts/get-user-posts/${props.userId}`} />
  );

  if (tab === "friends") {
    mainElement = <Users url={`friends/${props.userId}`} />;
  } else if (tab === "information" && props.userId === userId) {
    mainElement = <Information />;
  }
  return (
    <>
      <section className="md:flex md:items-start  mt-5 gap-2 [&>*:first-child]:basis-3/12  [&>*:nth-child(2)]:basis-5/12 [&>*:last-child]:basis-4/12">
        <UserInfos userId={props.userId} />
        <UserActions onSetTab={setTab} yourActions={userId === props.userId} />
        <UserGroups userId={props.userId} />
      </section>
      {/* <Posts url={`posts/get-user-posts/${props.userId}`} /> */}
      {mainElement}
    </>
  );
};
