"use client";
import React, { useEffect, useState } from "react";
import { UserId, ztUserMinimalData } from "@/Types/User";
import { FRIENDS_LIMIT } from "@/data/pageLimiter";
import { ztResultsOfFriendsInfiniteQuery } from "@/Types/resultsOfInfiniteQuery";
import { QueryInfinite } from "@/utils/QueryInfinite";
import { FriendGeneral } from "./FriendGeneral";

// This is my approach to make this component low coupling...
// function test()=>{
//    return (userId:UserId)=>{ // this is a component function
//         const use = mutate(userId)
//         return <>
//           <Button onClick={use}>Add Friend</Button>
//         </>
//       }
//   }
type props = {
  params: Record<string, string | number>;
  actions: (userId: UserId) => React.JSX.Element;
};
export type apiUrlType =
  | "recommend-user"
  | "not-interested"
  | "has-sent-request";

export const FriendsGeneral = (props: props) => {
  const [users, setUsers] = useState<ztUserMinimalData[]>([]);
  let [skip, setSkip] = useState(0);
  const [end, setEnd] = useState(false);
  const fetchNextPage = async () => {
    await QueryInfinite({
      url: "friends/get-users",
      cb: (result: ztResultsOfFriendsInfiniteQuery) => {
        setUsers((oldUsers) => [...oldUsers, ...result.users]);
        if (skip < result.usersCount) {
          setSkip(skip + FRIENDS_LIMIT);
        } else {
          setSkip(result.usersCount);
          setEnd(true);
        }
      },
      params: {
        skip,
        limit: FRIENDS_LIMIT,
        ...props.params,
      },
    });
  };
  useEffect(() => {
    setUsers([]);
    fetchNextPage();
  }, []);
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
          content={props.actions(user._id)}
        />
      ))}
    </div>
  );
};
