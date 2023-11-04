"use client";
import React, { useEffect, useReducer, useState } from "react";
import { Friend } from "./Friend";
import { UserId, ztUserMinimalData } from "@/Types/User";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Bearer } from "@/utils/Bearer";
import { api } from "@/lib/axios.api";
import { v4 } from "uuid";
import { FilterActionType, filterReducerType } from "./NotInterestedFriends";

export type resultsOfFriendsInfiniteQuery = {
  users: ztUserMinimalData[];
  userCounts: number;
};

type props = {
  users: ztUserMinimalData[];
  onChangeFilter: (data: {
    type: FilterActionType;
    payload: filterReducerType;
  }) => void;
  filterState: filterReducerType;
  setUsers: React.Dispatch<React.SetStateAction<ztUserMinimalData[]>>;
  onRemoveUserNotInterested: (userId: UserId) => void;
};
export type apiUrlType =
  | "recommend-user"
  | "not-interested"
  | "has-sent-request";

export const HasSentRequestFriends = (props: props) => {
  const { error, fetchNextPage, remove } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    queryKey: ["users", "friends"],
    queryFn: ({ pageParam = 1 }) => {
      return api
        .get<resultsOfFriendsInfiniteQuery>(
          `/users/has-sent-request-users?limit=10&skip=${(pageParam - 1) * 10}${
            props.filterState.usernameFilter
              ? `&searchInput=${props.filterState.usernameFilter}`
              : ""
          }`,
          {
            withCredentials: true,
          }
        )
        .then((data) => {
          if (
            (props.users.length == 0 && pageParam == 1) ||
            (props.users.length > 1 && pageParam > 1)
          ) {
            props.setUsers((oldUsers) => [...oldUsers, ...data.data.users]);
          }

          return data.data;
        });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (props.filterState.usernameFilter) {
        return undefined;
      }
      const theLastPage = Math.ceil(lastPage.userCounts / 10);
      if (allPages.length < theLastPage) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  useEffect(() => {
    let fetching = false;
    const onScroll = async (e: Event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.scrollingElement!;
      if (!fetching && scrollHeight - scrollTop <= clientHeight) {
        fetching = true;
        if (fetching) {
          await fetchNextPage();
        }
        fetching = false;
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => {
      remove();
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage]);
  return (
    <div className="[&>*]:mb-6 sm:grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-4">
      {props.users.map((user) => (
        <Friend
          filterState={props.filterState}
          removeUserNotInterested={props.onRemoveUserNotInterested}
          key={user._id}
          user={user}
        />
      ))}
    </div>
  );
};
