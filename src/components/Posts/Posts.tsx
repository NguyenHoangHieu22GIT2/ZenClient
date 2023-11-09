"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { ztPost, ztResultsOfPostsInfiniteQuery } from "@/Types/Post";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { Post } from "./Post";

import { linkToQueryPosts } from "@/utils/LinkToQuery";
import { POSTS_LIMIT } from "@/data/pageLimiter";
import Loading from "@/app/(Layout)/loading";
import { GroupId } from "@/Types/Group";
import { useQueryInfinite } from "@/hooks/useQueryInfinite";

type props = {
  userId?: string;
  groupId?: GroupId;
};

export const Posts = (props: props) => {
  const [posts, setPosts] = useState<ztPost[]>([]);
  const [skip, setSkip] = useState(0);
  const [end, setEnd] = useState(false);

  const fetchingPosts = useCallback(async () => {
    useQueryInfinite(
      linkToQueryPosts({
        limit: 3,
        skip: skip,
        userId: props.userId,
        groupId: props.groupId,
      }),
      (result: ztResultsOfPostsInfiniteQuery) => {
        setPosts((oldPosts) => [...oldPosts, ...result.posts]);
        const lastPageNumber = Math.ceil(result.postsCount / 3);
        if (skip < lastPageNumber) {
          setSkip(skip + 3);
        } else {
          setSkip(lastPageNumber * 3);
        }
      }
    );
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
        if (fetching) {
          await fetchingPosts();
        }
        fetching = false;
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [skip]);
  return (
    <div className="min-h-screen pb-10">
      {posts.map((post, index) => {
        return <Post key={index} post={post} />;
      })}
    </div>
  );
};
