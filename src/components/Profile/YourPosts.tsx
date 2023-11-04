"use client";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Posts } from "../Posts/Posts";
import { CreatePost } from "../Posts/CreatePost";
import { cookies } from "next/headers";
import { useUserStore } from "@/lib/useUserStore";
import { Friends } from "../Friends/Friends";
import Information from "./Information";

type tabs = "POSTS" | "FRIENDS" | "INFORMATION";

export const YourPosts = () => {
  const user = useUserStore((state) => state.user);
  const [tab, setTab] = useState<tabs>("POSTS");
  return (
    <div>
      <Card className="p-3 flex justify-stretch [&>*]:basis-1/3 gap-3">
        <Button onClick={() => setTab("POSTS")} variant={"secondary"}>
          Posts
        </Button>
        <Button onClick={() => setTab("FRIENDS")} variant={"secondary"}>
          Friends
        </Button>
        <Button onClick={() => setTab("INFORMATION")} variant={"secondary"}>
          Information
        </Button>
      </Card>
      <Separator className="my-5" />
      <CreatePost />
      <Separator className="my-5" />
      {/* <Posts userId={user._id} /> */}
      {/* <Information /> */}
    </div>
  );
};
