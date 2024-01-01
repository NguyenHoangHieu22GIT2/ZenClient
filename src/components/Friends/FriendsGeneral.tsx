"use client";
import React, { useEffect, useRef, useState } from "react";
import { UserId, ztUserMinimalData } from "@/Types/User";
import { FRIENDS_LIMIT } from "@/data/pageLimiter";
import { ztResultsOfFriendsInfiniteQuery } from "@/Types/resultsOfInfiniteQuery";
import { QueryInfinite } from "@/utils/QueryInfinite";
import { FriendGeneral } from "./FriendGeneral";

type props = {
  params: {
    usersType?: string,
    username?: string
    userId?: string
  }
  actions: (userId: UserId) => (...args: any) => React.JSX.Element;
  url: string;
};
export type apiUrlType =
  | "recommend-user"
  | "not-interested"
  | "has-sent-request";
const useDidMountEffect = (func: Function, deps: any[]) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};
export const FriendsGeneral = (props: props) => {
  const [users, setUsers] = useState<ztUserMinimalData[]>([]);
  let [skip, setSkip] = useState(0);
  const [end, setEnd] = useState(false);
  let change = true;
  console.log(change)
  const fetchNextPage = async () => {
    await QueryInfinite({
      url: props.url,
      cb: (result: ztResultsOfFriendsInfiniteQuery) => {
        setUsers((oldUsers) => [...oldUsers, ...result.users]);
        console.log(change)
        if (change === true) {
          if (skip < result.usersCount) {
            setSkip(skip + FRIENDS_LIMIT);
          } else {
            setSkip(result.usersCount);
            setEnd(true);
          }
        }
      },
      params: {
        skip,
        limit: FRIENDS_LIMIT,
        ...props.params,
      },
    });
  };
  useEffect(() => { fetchNextPage() }, [])
  useDidMountEffect(() => {
    change = false;
    fetchNextPage()
    setUsers([]);
    setEnd(false)
    setSkip(0)
  }, [props.params.username, props.params.usersType]);
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
      {users.map((user, index) => (
        <FriendGeneral
          key={index}
          user={user}
          addons={props.actions(user._id)}
          onSetUsers={setUsers}
        />
      ))}
    </div>
  );
};
