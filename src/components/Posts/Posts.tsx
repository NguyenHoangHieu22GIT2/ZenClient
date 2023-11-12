"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ztPost, ztResultsOfPostsInfiniteQuery } from "@/Types/Post";
import { Post } from "./Post";
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
    useQueryInfinite({
      url: "posts/get-posts",
      cb: (result: ztResultsOfPostsInfiniteQuery) => {
        setPosts((oldPosts) => [...oldPosts, ...result.posts]);
        const lastPageNumber = Math.ceil(result.postsCount / 3);
        if (skip < lastPageNumber) {
          setSkip(skip + 3);
        } else {
          setSkip(lastPageNumber * 3);
        }
      },
      params: { limit: 3, skip, userId: props.userId, groupId: props.groupId },
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
