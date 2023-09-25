"use client";
import React, {
  Fragment,
  PropsWithChildren,
  ReactNode,
  useEffect,
} from "react";
import { Header } from "./Header";
import { PropsClassName } from "@/Types/Props";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
import { useAuthStore } from "@/lib/storeZustand";
import useCheckAuth from "@/hooks/useCheckAuth";
interface props extends PropsClassName {
  children: ReactNode;
}

export const NoLayout = React.memo((props: props) => {
  const client = new QueryClient();
  useCheckAuth();
  return (
    <QueryClientProvider client={client}>
      <section className={props.className}>
        <main className="">{props.children}</main>
      </section>
    </QueryClientProvider>
  );
});
