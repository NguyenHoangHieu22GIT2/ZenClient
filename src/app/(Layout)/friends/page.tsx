"use client";
import { Friend } from "@/components/Friends/Friend";
import { Friends } from "@/components/Friends/Friends";
import { Layout } from "@/components/Layout/Layout";
import { Heading } from "@/components/ui/Heading";
import { Container } from "@/components/ui/Container";
import React, { useState } from "react";
import { FriendFilter } from "@/components/Friends/FriendFilter";
import useCheckAuth from "@/hooks/useCheckAuth";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";
import { useAuthStore } from "@/lib/storeZustand";
import { User, UserMinimalData } from "@/Types/User";

export default function page() {
  const [usernameFilter, setUsernameFilter] = useState("");
  const access_token = useAuthStore((state) => state.access_token);
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", "friends", usernameFilter],
    queryFn: () => {
      return api
        .post(
          "/users/recommend-user",
          usernameFilter ? { searchInput: usernameFilter } : {},
          {
            headers: {
              authorization: Bearer(access_token),
            },
          }
        )
        .then((data) => data.data as UserMinimalData[]);
    },
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    console.log(error);
    return <h1>Error</h1>;
  }

  function changeUsernameFilter(username: string) {
    setUsernameFilter(username);
  }
  return (
    <Container className="mt-3">
      <Heading className="mb-2 lg:text-lg font-bold">
        Friends you may know!
      </Heading>
      <div className="flex md:flex-row flex-col gap-2 [&>*:first-child]:basis-1/4 [&>*:last-child]:basis-3/4">
        <FriendFilter onChangeUsernameFilter={changeUsernameFilter} />
        <Friends friends={data || []} />
      </div>
    </Container>
  );
}
