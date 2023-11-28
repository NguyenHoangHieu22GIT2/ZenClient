"use client";
import { zPost, ztPost } from "@/Types/Post";
import { PropsPage } from "@/Types/PropsPage";
import { api } from "@/lib/axios.api";
import React from "react";
import { Post } from "@/components/Posts/Post";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";

export default function PostPage(props: PropsPage) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get=post"],
    queryFn: async () => {
      const result = await api.get<ztPost>(`posts/${props.params.id}`);
      const parsedResult = zPost.parse(result.data);
      console.log(result.data);
      return result.data;
    },
  });
  if (error) {
    console.log("Go into Error", error);
    return notFound();
  }
  if (isLoading || !data) {
    return <Skeleton className="w-full max-w-[800px]" />;
  }

  return (
    <div>
      <Post post={data} />
    </div>
  );
}
