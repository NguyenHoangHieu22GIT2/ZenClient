"use client";
import useCheckAuth from "@/hooks/useCheckAuth";
import { PropsWithChildren } from "react";

export function CheckAuth(props: PropsWithChildren) {
  useCheckAuth();
  return <></>;
}
