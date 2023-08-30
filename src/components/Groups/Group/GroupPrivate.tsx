import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

export const GroupPrivate = (props: {}) => {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Description</CardTitle>
        <CardDescription>
          This page is created for people to share about their cats. Cats are
          love, cats are life....
        </CardDescription>
      </CardHeader>
      <Separator className="my-3"></Separator>
      <CardContent>
        <CardTitle>Rules to follow:</CardTitle>
        <ul>
          <li>No Cursing in this group</li>
          <li>No Harm for anybody</li>
          <li>No dogs lover</li>
        </ul>
      </CardContent>
    </Card>
  );
};
