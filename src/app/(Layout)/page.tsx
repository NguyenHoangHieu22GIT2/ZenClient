import { CreatePost } from "@/components/Posts/CreatePost";
import { Posts } from "@/components/Posts/Posts";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";
import { Fragment } from "react";
import {
  zPost,
  zResultsOfPostsInfiniteQuery,
  ztResultsOfPostsInfiniteQuery,
} from "@/Types/Post";
import { cookies } from "next/headers";
import { POSTS_LIMIT } from "@/data/pageLimiter";
import { linkToQueryPosts } from "@/utils/LinkToQuery";

export default async function Home() {
  const jwtCookie = cookies().get("jwtToken");
  if (!jwtCookie) {
    return <h1>Error Found! Fix latter</h1>;
  }

  const data = await api.post<ztResultsOfPostsInfiniteQuery>(
    linkToQueryPosts({ skip: 0, limit: POSTS_LIMIT }),
    {},
    {
      withCredentials: true,
    }
  );
  console.log(data);
  const parsedData = zResultsOfPostsInfiniteQuery.parse(data.data);

  return (
    <Fragment>
      <CreatePost />
      <Posts postsData={parsedData} />
    </Fragment>
  );
}
