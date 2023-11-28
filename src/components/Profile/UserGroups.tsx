"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { zArrayGroupMinimal, ztArrayGroupMinimal } from "@/Types/Group";
import { AxiosError } from "axios";
import { UserGroup } from "./UserGroup";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import { useUserStore } from "@/lib/useUserStore";
import { Skeleton } from "../ui/skeleton";

type props = {
  userId: string;
};

export const UserGroups = React.memo((props: props) => {
  const userStored = useUserStore((state) => state.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-user-groups"],
    queryFn: () => {
      return api
        .get<ztArrayGroupMinimal>("groups-joined", {
          params: { limit: 3, userId: props.userId },
          withCredentials: true,
        })
        .then((data) => {
          const parsedData = zArrayGroupMinimal.parse(data.data);
          return parsedData;
        });
    },
  });

  if (isLoading || !data) {
    return <Skeleton className="w-3 h-96 rounded-sm basis-4/12" />;
  }
  if (error) {
    console.log("🚀 ~ file: UserGroups.tsx:41 ~ UserGroups ~ error:", error);
    return <h1>Error</h1>;
  }
  const searchParams = new URLSearchParams({
    userId: props.userId,
  });
  return (
    <div className="basis-4/12">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Groups</CardTitle>
              <CardDescription>See what Shadcn likes</CardDescription>
            </div>
            {userStored._id === props.userId && (
              <div>
                <Button asChild>
                  <Link href={`/groups?${searchParams.toString()}`}>
                    More +
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 w-full ">
            {data!.map((group, index) => {
              return (
                <div key={index}>
                  <UserGroup group={group} />
                  <Separator className="my-2" />
                </div>
              );
            })}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
});

// Will use this in the future :)
// const fetchingGroups = useCallback(async () => {
//   useQueryInfinite<
//     ztResultOfInfiniteQueryFindGroupsJoined,
//     { limit: number; skip: number; userId: string }
//   >({
//     url: "groups-joined",
//     cb: (result) => {
//       setGroups((oldgroups) => [...oldgroups, ...result.groups]);
//       const lastPageNumber = Math.ceil(result.groupsCount / 3);
//       if (skip < lastPageNumber) {
//         setSkip(skip + 3);
//       } else {
//         setSkip(lastPageNumber * 3);
//       }
//     },
//     params: { limit: 3, skip, userId: props.userId },
//   });
// }, [skip]);
// useEffect(() => {
//   fetchingGroups;
// }, []);
