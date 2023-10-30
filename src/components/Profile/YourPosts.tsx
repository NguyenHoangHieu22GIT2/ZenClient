import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Posts, resultsOfPostsInfiniteQuery } from "../Posts/Posts";
import { CreatePost } from "../Posts/CreatePost";
import { cookies } from "next/headers";

export type props = {
  postsData: resultsOfPostsInfiniteQuery;
};

export const YourPosts = (props: props) => {
  const userId = cookies().get("userId")!.value;
  return (
    <div>
      <Card className="p-3 flex justify-stretch [&>*]:basis-1/3 gap-3">
        <Button variant={"secondary"}>Posts</Button>
        <Button variant={"secondary"}>Friends</Button>
        <Button variant={"secondary"}>Information</Button>
      </Card>
      <Separator className="my-5" />
      <CreatePost />
      <Separator className="my-5" />
      <Posts
        postsData={{
          posts: props.postsData.posts,
          postsCount: props.postsData.postsCount,
        }}
        userId={userId}
      />
    </div>
  );
};
