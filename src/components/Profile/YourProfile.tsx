import React from "react";
import { YourInfos } from "./YourInfos";
import { YourPosts } from "./YourPosts";
import { UserGroups } from "./UserGroups";
import { Posts } from "../Posts/Posts";
import { useUserStore } from "@/lib/useUserStore";
import { api } from "@/lib/axios.api";

type props = {
  userId: string;
};

export const YourProfile = async (props: props) => {
  return (
    <>
      <section className="md:flex md:items-start  mt-5 gap-2 [&>*:first-child]:basis-3/12  [&>*:nth-child(2)]:basis-5/12 [&>*:last-child]:basis-4/12">
        <YourInfos userId={props.userId} />
        <YourPosts />
        <UserGroups />
      </section>
      <Posts userId={props.userId} />
    </>
  );
};
