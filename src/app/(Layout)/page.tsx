import { CreatePost } from "@/components/Posts/CreatePost";
import { Posts } from "@/components/Posts/Posts";
import { POSTS_LIMIT } from "@/data/pageLimiter";
import { api } from "@/lib/axios.api";
import { linkToQueryPosts } from "@/utils/LinkToQuery";
import { Fragment, Suspense } from "react";
import Loading from "./loading";
import { PropsPage } from "@/Types/PropsPage";

export default async function Home(props: PropsPage) {
  return (
    <Fragment>
      <CreatePost />
      <Posts />
    </Fragment>
  );
}
