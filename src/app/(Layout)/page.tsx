"use client";
import { Layout } from "@/components/Layout/Layout";
import { CreatePost } from "@/components/Posts/CreatePost";
import { Posts } from "@/components/Posts/Posts";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";
import { Fragment, useEffect } from "react";
import { Post } from "@/Types/Post";
import { cookies } from "next/headers";
import { useAuthStore } from "@/lib/storeZustand";
import { useInfiniteQuery } from "@tanstack/react-query";

export default async function Home() {
  // const jwtCookie = cookies().get("jwtToken");
  // if (!jwtCookie) {
  //   return <h1>Error Found! Fix latter</h1>;
  // }

  // const result = await api.get<Post[]>("posts/get-posts?limit=6&skip=0", {
  //   headers: {
  //     authorization: Bearer(jwtCookie.value),
  //   },
  // });
  const access_token = useAuthStore((state) => state.access_token);
  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", "mainPage"],
      queryFn: async ({ pageParam = 1 }) => {
        const result = await api.get<Post[]>(
          `posts/get-posts?limit=6&skip=${(pageParam - 1) * 6}`,
          {
            headers: {
              authorization: Bearer(access_token),
            },
          }
        );
        return result.data;
      },
      getNextPageParam: (lastPage, allPages) => {
        console.log(lastPage, allPages);
      },
      getPreviousPageParam: (firstPage, allPages) =>
        console.log(firstPage, allPages),
    });

  useEffect(() => {
    let fetching = false;
    const onScroll = async (e: Event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.scrollingElement!;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 2) {
        fetching = true;
        if (fetching) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", (e) => {});
    return () => document.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <Fragment>
      {/* <FullPost posts={result.data || []} /> */}
      <CreatePost />
      <Posts posts={data?.pages || []} />
    </Fragment>
  );
}
