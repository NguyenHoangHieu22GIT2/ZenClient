"use client";
import React, { useEffect, useReducer, useState } from "react";
import { Friend } from "./Friend";
import { zUser, UserId, ztUserMinimalData } from "@/Types/User";
import { useAuthStore } from "@/lib/storeZustand";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Bearer } from "@/utils/Bearer";
import { api } from "@/lib/axios.api";
import { v4 } from "uuid";
import { FilterActionType, filterReducerType } from "./NotInterestedFriends";
import { linkToQueryUsers } from "@/utils/LinkToQuery";
import { FRIENDS_LIMIT } from "@/data/pageLimiter";
import { checkUsersType } from "@/utils/CheckUsersType";
import { ztResultsOfFriendsInfiniteQuery } from "@/Types/resultsOfInfiniteQuery";

type props = {
  users: ztUserMinimalData[];
  onChangeFilter: ({
    type,
    payload,
  }: {
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

async function getResultsOfFriendsInfiniteQuery({
  pageParam,
  filterState,
  access_token,
  setUsers,
  users,
}: {
  pageParam: number;
  filterState: filterReducerType;
  access_token: string;
  users: ztUserMinimalData[];
  setUsers: React.Dispatch<React.SetStateAction<ztUserMinimalData[]>>;
}) {
  return api
    .get<ztResultsOfFriendsInfiniteQuery>(
      linkToQueryUsers({
        usersType: checkUsersType(filterState),
        skip: Math.abs(pageParam - 1) * FRIENDS_LIMIT,
        limit: FRIENDS_LIMIT,
        username: filterState.usernameFilter,
      }),
      {
        headers: {
          Authorization: Bearer(access_token),
        },
      }
    )
    .then((data) => {
      if (users.length > 0 && pageParam > 1) {
        setUsers((oldUsers) => [...oldUsers, ...data.data.users]);
      } else if (users.length === 0 && pageParam === 1) {
        setUsers(() => [...data.data.users]);
      }
      return data.data;
    });
}

const getNextPageParam = (
  lastPage: ztResultsOfFriendsInfiniteQuery,
  allPages: ztResultsOfFriendsInfiniteQuery[]
) => {
  const theLastPage = Math.ceil(lastPage.usersCount / FRIENDS_LIMIT);
  if (allPages.length < theLastPage) {
    return allPages.length + 1;
  } else {
    return undefined;
  }
};

export const Friends = (props: props) => {
  const access_token = useAuthStore((state) => state.access_token);
  const { error, fetchNextPage, remove, refetch } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    queryKey: ["users", "friends"],
    queryFn: ({ pageParam = 1 }) =>
      getResultsOfFriendsInfiniteQuery({
        users: props.users,
        setUsers: props.setUsers,
        filterState: props.filterState,
        access_token,
        pageParam,
      }),
    getNextPageParam,
  });

  useEffect(() => {
    if (props.users.length >= 1 && props.users.length <= 3) {
      fetchNextPage();
    }
  }, [props.users]);

  useEffect(() => {
    remove();
    refetch();
  }, [
    props.filterState.HasSentRequest,
    props.filterState.isNotInterested,
    props.filterState.usernameFilter,
  ]);

  useEffect(() => {
    let fetching = false;
    const onScroll = async (e: Event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.scrollingElement!;
      // console.log(scrollHeight - Math.floor(scrollTop) <= clientHeight * 1.1);

      if (
        !fetching &&
        scrollHeight - Math.floor(scrollTop) <= clientHeight * 1.1
      ) {
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
