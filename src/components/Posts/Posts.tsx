"use client";
import React, { useEffect, useState } from "react";
import { ztPost, ztResultsOfPostsInfiniteQuery } from "@/Types/Post";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { Post } from "./Post";

import { linkToQueryPosts } from "@/utils/LinkToQuery";
import { POSTS_LIMIT } from "@/data/pageLimiter";

type props = {
  userId?: string;
};

export const Posts = (props: props) => {
  const [posts, setPosts] = useState<ztPost[]>([]);
  const [postIds, setPostIds] = useState<string[]>([]);
  const { fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts", "mainPage"],
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    enabled: true,
    queryFn: async ({ pageParam = 1 }) => {
      const skip = Math.abs(pageParam - 1) * POSTS_LIMIT;
      const result = await api.post<ztResultsOfPostsInfiniteQuery>(
        // `posts/${props.linkToGetPost}&skip=${Math.abs((pageParam - 1) * 6)}`,
        linkToQueryPosts({
          limit: POSTS_LIMIT,
          skip: skip,
          userId: props.userId,
        }),
        {
          ids: postIds,
        },
        {
          withCredentials: true,
        }
      );

      setPosts((oldPosts) => [...oldPosts, ...result.data.posts]);
      setPostIds((oldPostIds) => [
        ...oldPostIds,
        ...result.data.posts.map((post) => post._id.toString()),
      ]);
      return result.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const theLastPage = Math.ceil(lastPage.postsCount / POSTS_LIMIT);
      if (allPages.length < theLastPage) {
        return allPages.length + 1;
      } else {
        return theLastPage;
      }
    },
  });

  useEffect(() => {
    let fetching = false;
    const onScroll = async (e: Event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.scrollingElement!;
      if (!fetching && scrollHeight - scrollTop <= clientHeight) {
        fetching = true;
        if (fetching) {
          await fetchNextPage();
        }
        fetching = false;
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="min-h-screen pb-10">
      {posts.map((post, index) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
};
