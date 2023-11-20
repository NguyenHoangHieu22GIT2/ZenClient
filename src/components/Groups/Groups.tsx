"use client";
import React, { useState } from "react";
import { Group } from "./Group";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import {
  zResultsOfGroupsInfiniteQuery,
  ztGroup,
  ztGroupQueries,
  ztResultsOfGroupsInfiniteQuery,
} from "@/Types/Group";
import { GROUPS_LIMIT } from "@/data/pageLimiter";
import { linkToQueryGroups } from "@/utils/LinkToQuery";
import jsCookie from "js-cookie";

type props = {
  userId: string;
};

export const Groups = (props: props) => {
  const [groups, setGroups] = useState<ztGroupQueries[]>([]);
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const { fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts", "mainPage"],
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    enabled: true,
    queryFn: async ({ pageParam = 1 }) => {
      const skip = Math.abs(pageParam - 1) * GROUPS_LIMIT;
      const result = await api.post<ztResultsOfGroupsInfiniteQuery>(
        linkToQueryGroups({
          limit: GROUPS_LIMIT,
          skip: skip,
          groupName: "",
          userId: jsCookie.get("userId"),
          userIdGroups: props.userId,
        })
      );
      const parsedResult = zResultsOfGroupsInfiniteQuery.parse(result.data);
      setGroups((oldGroups) => [...oldGroups, ...parsedResult.groups]);
      setGroupIds((oldGroupIds) => [
        ...oldGroupIds,
        ...parsedResult.groups.map((group) => group._id.toString()),
      ]);
      return result.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const theLastPage = Math.ceil(lastPage.groupsCount / GROUPS_LIMIT);
      if (allPages.length < theLastPage) {
        return allPages.length + 1;
      } else {
        return theLastPage;
      }
    },
  });
  return (
    <div className="[&>*]:mb-6 sm:grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-4">
      {groups.map((group, index) => {
        return <Group group={group} key={index} />;
      })}
    </div>
  );
};
