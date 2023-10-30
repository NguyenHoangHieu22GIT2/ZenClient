import { Heading } from "@/components/ui/Heading";
import { Container } from "@/components/ui/Container";
import React from "react";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";

import FriendsComponent from "@/components/Friends/FriendsComponent";
import { cookies } from "next/headers";
import { findUsersType, linkToQueryUsers } from "@/utils/LinkToQuery";
import { FRIENDS_LIMIT } from "@/data/pageLimiter";
import { apiUrlType } from "@/components/Friends/NotInterestedFriends";
import {
  zResultsOfFriendsInfiniteQuery,
  ztResultsOfFriendsInfiniteQuery,
} from "@/Types/resultsOfInfiniteQuery";

type props = {
  searchParams: {
    searchInput: string;
    usersType: findUsersType;
  };
};

export default async function page(props: props) {
  try {
    const jwtCookie = cookies().get("jwtToken");
    if (!jwtCookie) {
      return <h1>Error Found! Fix latter</h1>;
    }
    const username = props.searchParams.searchInput || "";
    const usersType = props.searchParams.usersType || "";

    const result = await api
      .get<ztResultsOfFriendsInfiniteQuery>(
        // "users/recommend-users?limit=10&skip=0",
        linkToQueryUsers({
          limit: FRIENDS_LIMIT,
          skip: 0,
          username,
          usersType: usersType,
        }),
        {
          headers: {
            authorization: Bearer(jwtCookie.value),
          },
        }
      )
      .then((data) => {
        const parsedData = zResultsOfFriendsInfiniteQuery.parse(data.data);
        return parsedData;
      })
      .catch((err) => {
        throw new Error(err);
      });
    return (
      <Container className="mt-3">
        <Heading className="mb-2 lg:text-lg font-bold">
          Friends you may know!
        </Heading>
        <FriendsComponent
          criteria={{ username, usersType }}
          friendsInifiteQuery={result}
        />
      </Container>
    );
  } catch (error: any) {
    console.log("Error:", error);
    return <h1>{error.toString()}</h1>;
  }
}
