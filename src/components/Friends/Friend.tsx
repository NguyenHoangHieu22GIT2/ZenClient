"use client";
import Image from "next/image";
import React from "react";
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

export const Friend = () => {
  function notInterested() {
    //TODO:Send back to server so that server will ignore this friend in the future
  }

  function addFriend() {
    //TODO:Send back to server the userId so that the server can send a friend request
  }
  return (
    <Card className="shadow-lg overflow-hidden rounded-lg">
      <CardHeader className="p-0 mx-auto">
        <Link href={"/user/1"}>
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
        <CardTitle>Martinez W</CardTitle>
        <CardDescription>7km away...</CardDescription>
      </CardContent>
      <CardFooter className="grid grid-cols-2">
        <Button onClick={notInterested} variant={"ghost"}>
          Not interested
        </Button>
        <Button onClick={addFriend} variant={"default"}>
          Add Friend
        </Button>
      </CardFooter>
    </Card>
  );
};
{
  /* <div className="border rounded-lg overflow-hidden"> */
}
{
  /*   <Image src={"/avatar.jpg"} alt="asd" width={500} height={500} /> */
}
{
  /*   <h1>Martinez W</h1> */
}
{
  /* </div> */
}
