import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FormCreatePost } from "./FormCreatePost";

export const CreatePost = async (props: {}) => {
  return (
    <Card className="m-2 mx-auto w-full lg:max-w-[800px]">
      <CardHeader>
        <CardTitle>Express Yourself</CardTitle>
        <CardDescription>Show yourself to the world!</CardDescription>
      </CardHeader>
      <CardContent>
        <FormCreatePost />
      </CardContent>
    </Card>
  );
};
