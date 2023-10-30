"use client";
import React, { useEffect, useState } from "react";
import { ztPost, ztResultsOfPostsInfiniteQuery } from "@/Types/Post";
import { useAuthStore } from "@/lib/storeZustand";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";
import { Post } from "./Post";

import { linkToQueryPosts } from "@/utils/LinkToQuery";
import { POSTS_LIMIT } from "@/data/pageLimiter";

type props = {
  postsData: ztResultsOfPostsInfiniteQuery;
  userId?: string;
};

export const Posts = (props: props) => {
  const access_token = useAuthStore((state) => state.access_token);
  const [posts, setPosts] = useState<ztPost[]>(
    (props.postsData && props.postsData.posts) || []
  );
  const [postIds, setPostIds] = useState<string[]>(
    props.postsData.posts.map((post) => post._id)
  );
  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", "mainPage"],
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      enabled: false,
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
            postIds: postIds,
          },
          {
            headers: {
              authorization: Bearer(access_token),
            },
          }
        );
        if (pageParam > 1) {
          setPosts((oldPosts) => [...oldPosts, ...result.data.posts]);
          setPostIds((oldPostIds) => [
            ...oldPostIds,
            ...result.data.posts.map((post) => post._id.toString()),
          ]);
        }
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
    <div>
      {posts.map((post, index) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
};
