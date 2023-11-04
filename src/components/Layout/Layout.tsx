import React, { ReactNode } from "react";
import { Header } from "./Header";
import { PropsClassName } from "@/Types/Props";
import { CheckAuth } from "./CheckAuth";
import { Provider } from "./Provider";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";
import { cookies } from "next/headers";
import { ztNotification } from "@/Types/Notification";
import { linkToQueryPosts } from "@/utils/LinkToQuery";

interface props extends PropsClassName {
  children: ReactNode;
}

export const Layout = async (props: props) => {
  return (
    <Provider>
      <CheckAuth />
      <section className={props.className}>
        <Header />
        <main>{props.children}</main>
      </section>
    </Provider>
  );
};
