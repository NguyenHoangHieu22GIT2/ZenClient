import { resultsOfPostsInfiniteQuery } from "@/components/Posts/Posts";
import { YourProfile } from "@/components/Profile/YourProfile";
import { Container } from "@/components/ui/Container";
import { POSTS_LIMIT } from "@/data/pageLimiter";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";
import { linkToQueryPosts } from "@/utils/LinkToQuery";
import { cookies } from "next/headers";
import React from "react";

export default async function Userpage(props: any) {
  const jwtToken = cookies().get("jwtToken");
  const userId = cookies().get("userId");
  if (!jwtToken || !userId) {
    return <h1>Error shit man</h1>;
  }
  try {
    const results = await api
      .post<resultsOfPostsInfiniteQuery>(
        linkToQueryPosts({
          limit: POSTS_LIMIT,
          skip: 0,
          userId: userId.value,
        }),
        {},
        { headers: { Authorization: Bearer(jwtToken.value) } },
      )
      .then((data) => data)
      .catch((err) => {
        throw new Error(err);
      });
    return (
      <Container>
        <YourProfile postsData={results.data} />
      </Container>
    );
  } catch (error) {
    return <h1>Error going</h1>;
  }
}
