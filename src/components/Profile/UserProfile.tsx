"use client";
import React, { useState } from "react";
import { UserInfos } from "./UserInfos";
import { UserActions } from "./UserActions";
import { UserGroups } from "./UserGroups";
import { Posts } from "../Posts/Posts";
import Users from "../Users/Users";
import { useUserStore } from "@/lib/useUserStore";
import Information from "./Information";
import { UserId, ztUserMinimalData } from "@/Types/User";
import { Separator } from "../ui/separator";
import { FriendsGeneral } from "../Friends/FriendsGeneral";
import { FriendsAction } from "./FriendsAction";

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
  const friendsAction: (
    userId: UserId
  ) => (args: {
    onSetUser: React.Dispatch<React.SetStateAction<ztUserMinimalData[]>>;
  }) => React.JSX.Element = (userId: UserId) => (args) =>
    <FriendsAction onSetUser={args.onSetUser} userId={userId} />;
  if (tab === "friends") {
    mainElement = (
      <FriendsGeneral
        url="friends/get-users"
        params={{ userId: props.userId }}
        actions={friendsAction}
      />
    );
  } else if (tab === "information" && props.userId === userId) {
    mainElement = <Information />;
  }
  return (
    <>
      <section className="md:flex md:justify-center  mt-5 gap-2 ">
        <UserInfos userId={props.userId} />
        <UserActions onSetTab={setTab} yourActions={userId === props.userId} />
        <UserGroups userId={props.userId} />
      </section>
      <Separator className="my-5" />

      {mainElement}
    </>
  );
};
