import { Layout } from "@/components/Layout/Layout";
import { CreatePost } from "@/components/Posts/CreatePost";
import { Posts } from "@/components/Posts/Posts";
import useCheckAuth from "@/hooks/useCheckAuth";
import { api } from "@/lib/axios.api";
import { useAuthStore } from "@/lib/storeZustand";
import { Bearer } from "@/utils/Bearer";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { Post } from "@/Types/Post";
import { cookies } from "next/headers";
import { isNotUndefined } from "@/utils/isUndefined";
import { FullPost } from "@/components/Posts/FullPost";
import jwtDecode from "jwt-decode";

export default async function Home() {
  const jwtCookie = cookies().get("jwtToken");
  if (!jwtCookie) {
    return <h1>Error Found! Fix latter</h1>;
  }
  const result = await api.get<Post[]>("posts/get-posts?limit=6&skip=0", {
    headers: {
      authorization: Bearer(jwtCookie.value),
    },
  });
  // const access_token = useAuthStore((state) => state.access_token);
  // const { isLoading, refetch, data, error } = useQuery({
  //   queryKey: ["posts", "mainPage"],
  //   queryFn: async () => {
  //     const result = await api.get<Post[]>("posts/get-posts?limit=6&skip=0", {
  //       headers: {
  //         authorization: Bearer(access_token),
  //       },
  //     });
  //     return result.data;
  //   },
  // });
  return (
    <Fragment>
      {/* <FullPost posts={result.data || []} /> */}
      <CreatePost />
      <Posts posts={result.data || []} />
    </Fragment>
  );
}
