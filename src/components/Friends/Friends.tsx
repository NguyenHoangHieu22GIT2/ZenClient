"use client";
import React from "react";
import { Friend } from "./Friend";
import { User, UserMinimalData } from "@/Types/User";

type props = {
  friends: UserMinimalData[];
};

export const Friends = (props: props) => {
  console.log(props.friends);
  return (
    <div className="[&>*]:mb-6 sm:grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-4">
      {props.friends.map((friend) => (
        <Friend key={friend._id} user={friend} />
      ))}
    </div>
  );
};
