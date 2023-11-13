"use client";
import React, { useState } from "react";
import { Posts } from "../../Posts/Posts";
import { GroupId } from "@/Types/Group";
import { CreatePost } from "@/components/Posts/CreatePost";

type props = {
  groupId: GroupId;
};

type tabs = "posts" | "members" | "events";
export const GroupData = (props: props) => {
  const [tab, setTab] = useState<tabs>("posts");

  let mainPart = (
    <>
      <CreatePost groupId={props.groupId} />
      <Posts url={`groups/${props.groupId}/posts`} />
    </>
  );
  switch (tab) {
    case "members":
      mainPart = <></>;
      break;
    case "events":
      mainPart = <></>;
  }
  return <div>{mainPart}</div>;
};
