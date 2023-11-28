"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ztPost, ztResultsOfPostsInfiniteQuery } from "@/Types/Post";
import { Post } from "./Post";
import { QueryInfinite } from "@/utils/QueryInfinite";
import { POSTS_LIMIT } from "@/data/pageLimiter";
import { v4 } from "uuid";

type props = {
  url: string;
  params?: Record<string, string>;
  inifiteScroll: boolean;
};

export const Posts = React.memo((props: props) => {
  const [posts, setPosts] = useState<ztPost[]>([]);
  const [skip, setSkip] = useState(0);
  const [end, setEnd] = useState(false);
  const fetchingPosts = useCallback(async () => {
    QueryInfinite({
      url: props.url,
      cb: (result: ztResultsOfPostsInfiniteQuery) => {
        setPosts((oldPosts) => [...oldPosts, ...result.posts]);
        const lastPageNumber = Math.ceil(result.postsCount / POSTS_LIMIT);
        if (skip / POSTS_LIMIT < lastPageNumber) {
          setSkip(skip + POSTS_LIMIT);
        } else if (!props.inifiteScroll) {
          setEnd(true);
        }
      },
      params: { limit: POSTS_LIMIT, skip, ...props.params },
    });
  }, [skip, props.params, props.url, props.inifiteScroll]);

  useEffect(() => {
    fetchingPosts();
  }, []);

  useEffect(() => {
    let fetching = false;
    const onScroll = async () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.scrollingElement!;
      if (!fetching && Math.floor(scrollHeight - scrollTop) <= clientHeight) {
        fetching = true;
        if (fetching && !end) {
          await fetchingPosts();
        }
        fetching = false;
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [skip, end, fetchingPosts]);
  return (
    <div className="">
      {posts.map((post, index) => {
        return <Post key={index} post={post} />;
      })}
    </div>
  );
});
