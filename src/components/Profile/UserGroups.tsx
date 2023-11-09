import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { UserGroup } from "./UserGroup";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";

export const UserGroups = (props: {}) => {
  console.log("Hello World");
  // const {} = useQuery({
  //   queryKey: ["get-groups-user"],
  //   queryFn: () => {
  //     return api.get("/us");
  //   },
  // });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Groups</CardTitle>
        <CardDescription>See what Shadcn likes</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full ">
          <UserGroup />
          <Separator className="my-2" />
          <UserGroup />
          <Separator className="my-2" />
          <UserGroup />
          <Separator className="my-2" />
          <UserGroup />
          <Separator className="my-2" />
          <UserGroup />
          <Separator className="my-2" />
          <UserGroup />
          <Separator className="my-2" />
          <UserGroup />
          <Separator className="my-2" />
          <UserGroup />
          <Separator className="my-2" />
          <UserGroup />
          <Separator className="my-2" />
          <UserGroup />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
