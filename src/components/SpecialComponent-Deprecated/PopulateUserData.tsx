"use client";
import { ztUserMinimalData } from "@/Types/User";
import { useUserStore } from "@/lib/useUserStore";
import React, { useEffect } from "react";

type props = {
  user: string;
};
export const PopulateUserData = (props: props) => {
  const user: ztUserMinimalData = JSON.parse(props.user);
  const changeUser = useUserStore((state) => state.changeUser);
  useEffect(() => {
    changeUser(user);
  }, [changeUser]);
  return <></>;
};
