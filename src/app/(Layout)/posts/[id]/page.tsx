import { zPost, ztPost } from "@/Types/Post";
import { PropsPage } from "@/Types/PropsPage";
import { api } from "@/lib/axios.api";
import React from "react";
import { cookies } from "next/headers";
import { Bearer } from "@/utils/Bearer";
import { Post } from "@/components/Posts/Post";

export default async function PostPage(props: PropsPage) {
  const cookie = cookies().get("jwtToken");
  console.log(cookie);
  const result = await api.get<ztPost>(`posts/${props.params.id}`, {
    headers: {
      Authorization: Bearer(cookie && cookie?.value),
    },
  });
  console.log(result.data);
  // const parsedResult = zPost.parse(result.data);
  return (
    <div>
      <Post post={result.data} />
    </div>
  );
}
