import React, { Fragment, PropsWithChildren, ReactNode } from "react";
import { Header } from "./Header";
import { PropsClassName } from "@/Types/Props";

interface props extends PropsClassName {
  children: ReactNode

}

export const Layout = (props: props) => {
  return (
    <section className={props.className}>
      <Header />
      <main className="">{props.children}</main>
    </section>
  );
};
