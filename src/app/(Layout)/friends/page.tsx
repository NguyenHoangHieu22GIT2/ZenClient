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

type props = {
  searchParams: {
    searchInput: string;
    usersType: findUsersType;
  };
};

export default async function page(props: props) {
  try {
    const username = props.searchParams.searchInput || "";
    const usersType = props.searchParams.usersType || "";
    return (
      <Container className="mt-3">
        <Heading className="mb-2 lg:text-lg font-bold">
          Friends you may know!
        </Heading>
        <FriendsComponent criteria={{ username, usersType }} />
      </Container>
    );
  } catch (error: any) {
    console.log("Error:", error);
    return <h1>{error.toString()}</h1>;
  }
}
