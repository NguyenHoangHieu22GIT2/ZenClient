import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FormCreatePost } from "./FormCreatePost";
import { Post } from "@/Types/Post";
import jwtDecode from "jwt-decode";
import { cookies } from "next/headers";
import { User } from "@/Types/User";
import { jwtCookieToObject } from "@/utils/jwtCookieToObject";

type props = {
  onCreatePost?: (post: Post) => void;
};

export const CreatePost = async (props: props) => {
  const user = jwtCookieToObject();

  return (
    <Card className="m-2 mx-auto w-full lg:max-w-[800px]">
      <CardHeader>
        <CardTitle>Express Yourself</CardTitle>
        <CardDescription>Show yourself to the world!</CardDescription>
      </CardHeader>
      <CardContent>
        <FormCreatePost user={user} />
      </CardContent>
    </Card>
  );
};
