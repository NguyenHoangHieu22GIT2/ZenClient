import { UserId, ztUserMinimalData } from "@/Types/User";
import React, { useCallback, useEffect, useState } from "react";
import User from "./User";
import { QueryInfinite } from "@/utils/QueryInfinite";
import { ztResultsOfFriendsInfiniteQuery } from "@/Types/resultsOfInfiniteQuery";
import { FRIENDS_LIMIT } from "@/data/pageLimiter";

type props = {
  url: string;
};

export default function Users(props: props) {
  const [end, setEnd] = useState(false);
  const [skip, setSkip] = useState(0);
  const [users, setUsers] = useState<ztUserMinimalData[]>([]);
  console.log(props.url);
  const fetchingUsers = useCallback(async () => {
    QueryInfinite<ztResultsOfFriendsInfiniteQuery>({
      url: props.url,
      cb: (result) => {
        setUsers((oldUsers) => [...oldUsers, ...result.users]);
        const lastPageNumber = Math.ceil(result.usersCount / FRIENDS_LIMIT);
        console.log(Math.ceil(skip / FRIENDS_LIMIT) < lastPageNumber);
        console.log(skip, lastPageNumber);
        if (Math.ceil(skip / FRIENDS_LIMIT) < lastPageNumber) {
          setSkip(skip + FRIENDS_LIMIT);
        } else {
          setEnd(true);
        }
      },
      params: { limit: FRIENDS_LIMIT, skip },
    });
  }, [skip, props.url]);

  useEffect(() => {
    fetchingUsers();
  }, [fetchingUsers]);

  useEffect(() => {
    let fetching = false;
    const onScroll = async (e: Event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.scrollingElement!;
      if (!fetching && scrollHeight - scrollTop <= clientHeight) {
        fetching = true;
        if (fetching && !end) {
          await fetchingUsers();
        }
        fetching = false;
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [skip, end]);
  const removeOneUser = useCallback(
    (userId: UserId) => {
      setUsers((oldUsers) => {
        return oldUsers.filter((user) => user._id !== userId);
      });
    },
    [users],
  );

  return (
    <div className="flex gap-5 flex-wrap mb-10">
      {users.map((user) => {
        return <User key={user._id} user={user} onRemoveUser={removeOneUser} />;
      })}
    </div>
  );
}
