import { zPost, ztPost } from "@/Types/Post";
import { Props } from "@/Types/PropsPage";
import { api } from "@/lib/axios.api";
import React from "react";

export default async function PostPage(props: Props) {
  const result = await api.get<ztPost>(`posts/${props.params.id}`, {
    withCredentials: true,
  });
  const parsedResult = zPost.parse(result.data);
  return <div>page</div>;
}
