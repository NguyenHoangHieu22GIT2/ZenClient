import { Layout } from "@/components/Layout/Layout";
import { CreatePost } from "@/components/Posts/CreatePost";
import { Posts } from "@/components/Posts/Posts";
import useCheckAuth from "@/hooks/useCheckAuth";
import { api } from "@/lib/axios.api";
import { useAuthStore } from "@/lib/storeZustand";
import { Bearer } from "@/utils/Bearer";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { cookies } from "next/headers";
import { Post } from "@/Types/Post";

export default async function Home() {
  // const result = await api.get("posts/get-posts?limit=6&skip=0", {
  //   headers: {
  //     authorization: Bearer(
  //       (cookies().get("jwtToken") && cookies().get("jwtToken")?.value) || ""
  //     ),
  //   },
  // });
  // const data: Post[] = await result.data;
  return (
    <Fragment>
      <CreatePost />
      <Posts posts={[]} />
    </Fragment>
  );
}
