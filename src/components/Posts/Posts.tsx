"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ztPost, ztResultsOfPostsInfiniteQuery } from "@/Types/Post";
import { Post } from "./Post";
import { GroupId } from "@/Types/Group";
import { useQueryInfinite } from "@/hooks/useQueryInfinite";
import { POSTS_LIMIT } from "@/data/pageLimiter";

type props = {
  url: string;
  params?: Record<string, string>;
};

export const Posts = (props: props) => {
  const [posts, setPosts] = useState<ztPost[]>([]);
  const [skip, setSkip] = useState(0);
  const [end, setEnd] = useState(false);
  const fetchingPosts = useCallback(async () => {
    useQueryInfinite({
      url: props.url,
      cb: (result: ztResultsOfPostsInfiniteQuery) => {
        setPosts((oldPosts) => [...oldPosts, ...result.posts]);
        const lastPageNumber = Math.ceil(result.postsCount / POSTS_LIMIT);
        if (skip / POSTS_LIMIT < lastPageNumber) {
          setSkip(skip + POSTS_LIMIT);
        } else {
          setEnd(true);
        }
      },
      params: { limit: POSTS_LIMIT, skip, ...props.params },
    });
  }, [skip]);

  useEffect(() => {
    fetchingPosts();
  }, []);

  useEffect(() => {
    let fetching = false;
    const onScroll = async (e: Event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.scrollingElement!;
      if (!fetching && scrollHeight - scrollTop <= clientHeight) {
        fetching = true;
        if (fetching && !end) {
          await fetchingPosts();
        }
        fetching = false;
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [skip, end]);
  return (
    <div className="">
      {posts.map((post, index) => {
        return <Post key={index} post={post} />;
      })}
    </div>
  );
};
