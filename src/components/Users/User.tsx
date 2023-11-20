import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { UserId, zUserId, ztUserId, ztUserMinimalData } from "@/Types/User";
import Image from "next/image";
import { CheckImageUrl } from "@/utils/CheckImageUrl";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";

type props = {
  user: ztUserMinimalData;
  onRemoveUser: (userId: UserId) => void
};

export default function User(props: props) {
  const { data, error, isLoading, mutate } = useMutation({
    mutationKey: ["Unfriend"],
    mutationFn: async (data: UserId) => {
      return api.patch<ztUserId>("friends/unfriend", { userId: data }, { withCredentials: true }).then(result => {
        const parsedResult = zUserId.parse(result.data)
        props.onRemoveUser(parsedResult.userId)
        return parsedResult;
      })
    }
  })

  const unfriendMutation = useCallback(() => {
    mutate(props.user._id)
  }, [])
  return (
    <Card className="shadow-lg overflow-hidden rounded-lg">
      <CardHeader className="p-0 mx-auto">
        <Link href={`/user/${props.user._id}`}>
          <Image
            className="aspect-square w-full"
            src={CheckImageUrl(props.user.avatar)}
            alt={props.user.username}
            width={200}
            height={200}
          />
        </Link>
      </CardHeader>
      <CardContent className="mt-5">
        <CardTitle>{props.user.username}</CardTitle>
        <CardDescription>{props.user.email}</CardDescription>
      </CardContent>
      <CardFooter className="grid grid-cols-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full">Settings</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Button onClick={unfriendMutation} className="w-full inline" variant={"secondary"}>Unfriend</Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
