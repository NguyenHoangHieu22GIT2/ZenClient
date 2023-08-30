"use client"
import React, { Fragment, PropsWithChildren, ReactNode } from "react";
import { Header } from "./Header";
import { PropsClassName } from "@/Types/Props";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
interface props extends PropsClassName {
  children: ReactNode

}

export const Layout = (props: props) => {
  const client = new QueryClient()
  return (
    <QueryClientProvider client={client}>
      <section className={props.className}>
        <Header />
        <main className="">{props.children}</main>
      </section>

    </QueryClientProvider>
  );
};
