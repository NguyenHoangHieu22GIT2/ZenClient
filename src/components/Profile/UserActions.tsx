"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { CreatePost } from "../Posts/CreatePost";
import { Tab } from "./UserProfile";
import { cn } from "@/lib/utils";

type props = {
  onSetTab: React.Dispatch<React.SetStateAction<Tab>>;
  yourActions: boolean;
};

export const UserActions = (props: props) => {
  return (
    <div>
      <Card className={"p-3 flex justify-stretch gap-3 [&>*]:basis-1/3 "}>
        <Button onClick={() => props.onSetTab("posts")} variant={"secondary"}>
          Posts
        </Button>
        <Button onClick={() => props.onSetTab("friends")} variant={"secondary"}>
          Friends
        </Button>
        <Button
          onClick={() => props.onSetTab("information")}
          variant={"secondary"}
        >
          Information
        </Button>
      </Card>
      <Separator className="my-5" />
      <CreatePost />
      <Separator className="my-5" />
    </div>
  );
};
