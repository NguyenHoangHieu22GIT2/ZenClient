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

export const UserGroups = (props: {}) => {
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
