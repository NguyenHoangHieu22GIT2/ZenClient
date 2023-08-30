"use client";
import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
export const Group = (props: {}) => {
  function notInterested() {
    //TODO:Send back to server so that server will ignore this friend in the future
  }

  function joinGroup() {
    //TODO:Send back to server the userId so that the server can send a friend request
  }
  return (
    <Card className="shadow-lg overflow-hidden rounded-lg">
      <CardHeader className="p-0 mx-auto">
        <Link href={"/groups/1"}>
          <Image
            className="mx-auto"
            src={"/avatar.jpg"}
            alt="asd"
            width={500}
            height={500}
          />
        </Link>
      </CardHeader>
      <CardContent className="mt-5">
        <CardTitle>LandMewo</CardTitle>
        <CardDescription>
          Landmewo is a group for people love cat
        </CardDescription>
      </CardContent>
      <CardFooter className="grid grid-cols-2">
        <Button onClick={notInterested} variant={"ghost"}>
          Not interested
        </Button>
        <Button onClick={joinGroup} variant={"default"}>
          Join Group
        </Button>
      </CardFooter>
    </Card>
  );
};
