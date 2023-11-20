import { CreatePost } from "@/components/Posts/CreatePost";
import { Posts } from "@/components/Posts/Posts";
import { Fragment } from "react";
import { PropsPage } from "@/Types/PropsPage";

export default async function Home(props: PropsPage) {
  return (
    <Fragment>
      <CreatePost />
      <Posts url="posts/get-posts" />
    </Fragment>
  );
}
