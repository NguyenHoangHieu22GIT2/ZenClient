"use client";
import React, { useEffect, useReducer, useState } from "react";
import { Friend } from "./Friend";
import { zUser, UserId, ztUserMinimalData } from "@/Types/User";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Bearer } from "@/utils/Bearer";
import { api } from "@/lib/axios.api";
import { v4 } from "uuid";
import { FilterActionType, filterReducerType } from "./NotInterestedFriends";
import { linkToQueryUsers } from "@/utils/LinkToQuery";
import { FRIENDS_LIMIT } from "@/data/pageLimiter";
import { checkUsersType } from "@/utils/CheckUsersType";
import { ztResultsOfFriendsInfiniteQuery } from "@/Types/resultsOfInfiniteQuery";
import { useQueryInfinite } from "@/hooks/useQueryInfinite";

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
  setUsers,
  users,
}: {
  pageParam: number;
  filterState: filterReducerType;
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
        withCredentials: true,
      }
    )
    .then((data) => {
      if (users.length > 0) {
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
  let [skip, setSkip] = useState(0);
  const [end, setEnd] = useState(false);
  const fetchNextPage = async () => {
    await useQueryInfinite({
      url: "users/get-users",
      cb: (result: ztResultsOfFriendsInfiniteQuery) => {
        props.setUsers((oldUsers) => [...oldUsers, ...result.users]);
        if (skip < result.usersCount) {
          setSkip(skip + FRIENDS_LIMIT);
        } else {
          setSkip(result.usersCount);
          setEnd(true);
        }
      },
      params: {
        usersType: checkUsersType(props.filterState),
        skip,
        limit: FRIENDS_LIMIT,
        username: props.filterState.usernameFilter,
      },
    });
  };
  useEffect(() => {
    props.setUsers([]);
    skip = 0;
    fetchNextPage();
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
      if (
        !fetching &&
        scrollHeight - Math.floor(scrollTop) <= clientHeight * 1.1 &&
        !end
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
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage]);
  return (
    <div className="[&>*]:mb-6 sm:grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-4">
      {props.users.map((user, index) => (
        <Friend
          filterState={props.filterState}
          removeUserNotInterested={props.onRemoveUserNotInterested}
          key={index}
          user={user}
        />
      ))}
    </div>
  );
};
