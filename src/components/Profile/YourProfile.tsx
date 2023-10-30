import React from "react";
import { YourInfos } from "./YourInfos";
import { YourPosts } from "./YourPosts";
import { UserGroups } from "./UserGroups";
import { resultsOfPostsInfiniteQuery } from "../Posts/Posts";

export type props = {
  postsData: resultsOfPostsInfiniteQuery;
};

export const YourProfile = (props: props) => {
  return (
    <section className="md:flex md:items-start  mt-5 gap-2 [&>*:first-child]:basis-3/12  [&>*:nth-child(2)]:basis-5/12 [&>*:last-child]:basis-4/12">
      <YourInfos />
      <YourPosts postsData={props.postsData} />
      <UserGroups />
    </section>
  );
};
