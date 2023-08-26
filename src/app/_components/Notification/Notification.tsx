import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Notification = (props: {}) => {
  return (
    <Card className="my-2">
      <CardContent className="flex p-2 gap-2 items-center">
        <div>
          <Avatar>
            <AvatarImage src="/avatar.jpeg" alt="Avatar" />
            <AvatarFallback>Holy Sheet</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <CardTitle className="text-sm md:text-xl">
            Shadcn has liked your post
          </CardTitle>
          <CardDescription>Today is a good day for coding...</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};
