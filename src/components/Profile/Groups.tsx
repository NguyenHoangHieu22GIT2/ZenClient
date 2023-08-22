import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Group } from "./Group";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export const Groups = (props: {}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Groups</CardTitle>
        <CardDescription>See what Shadcn likes</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full ">
          <Group />
          <Separator className="my-2" />
          <Group />
          <Separator className="my-2" />
          <Group />
          <Separator className="my-2" />
          <Group />
          <Separator className="my-2" />
          <Group />
          <Separator className="my-2" />
          <Group />
          <Separator className="my-2" />
          <Group />
          <Separator className="my-2" />
          <Group />
          <Separator className="my-2" />
          <Group />
          <Separator className="my-2" />
          <Group />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
