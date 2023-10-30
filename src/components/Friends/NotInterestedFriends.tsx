"use client";
import React, { useEffect, useReducer, useState } from "react";
import { Friend } from "./Friend";
import { UserId, ztUserMinimalData } from "@/Types/User";
import { useAuthStore } from "@/lib/storeZustand";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Bearer } from "@/utils/Bearer";
import { api } from "@/lib/axios.api";
import { v4 } from "uuid";
import { ztResultsOfFriendsInfiniteQuery } from "@/Types/resultsOfInfiniteQuery";

export type FilterActionType =
  | "SET_USERNAME"
  | "SET_NOT_INTERESTED"
  | "SET_HAS_SENT_REQUEST"
  | "CHANGE_ALL";
export type filterReducerType = {
  usernameFilter?: string;
  isNotInterested?: boolean;
  HasSentRequest?: boolean;
};

export interface FilterAction {
  type: FilterActionType;
  payload: filterReducerType;
}

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

export const NotInterestedFriends = (props: props) => {
  const access_token = useAuthStore((state) => state.access_token);
  const { fetchNextPage, remove } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    queryKey: ["users", "friends"],
    queryFn: ({ pageParam = 1 }) => {
      return api
        .get<ztResultsOfFriendsInfiniteQuery>(
          `/users/not-interested?limit=5&skip=${(pageParam - 1) * 5}${
            props.filterState.usernameFilter
              ? `&searchInput=${props.filterState.usernameFilter}`
              : ""
          }`,
          {
            headers: {
              Authorization: Bearer(access_token),
            },
          }
        )
        .then((data) => {
          if (
            (props.users.length == 0 && pageParam === 1) ||
            (props.users.length > 1 && pageParam !== 1)
          )
            props.setUsers((oldUsers) => [...oldUsers, ...data.data.users]);

          return data.data;
        });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (props.filterState.usernameFilter) {
        return undefined;
      }
      const theLastPage = Math.ceil(lastPage.usersCount / 5);
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
      document.removeEventListener("scroll", onScroll);
      remove();
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
