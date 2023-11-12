import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "lucide-react";
import { ztUserMinimalData } from "@/Types/User";
import Image from "next/image";
import { CheckImageUrl } from "@/utils/CheckImageUrl";

type props = {
  user: ztUserMinimalData;
};

export default function User(props: props) {
  return (
    <Card className="shadow-lg overflow-hidden rounded-lg">
      <CardHeader className="p-0 mx-auto">
        <Link href={`/user/${props.user._id}`}>
          <Image
            className="mx-auto"
            src={CheckImageUrl(props.user.avatar)}
            alt={props.user.username}
            width={500}
            height={500}
          />
        </Link>
      </CardHeader>
      <CardContent className="mt-5">
        <CardTitle>{props.user.username}</CardTitle>
        <CardDescription>{props.user.email}</CardDescription>
      </CardContent>
      <CardFooter className="grid grid-cols-2"></CardFooter>
    </Card>
  );
}
