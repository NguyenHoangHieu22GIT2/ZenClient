import React, { ReactNode, useEffect } from "react";
import { Header } from "./Header";
import { PropsClassName } from "@/Types/Props";
import { CheckAuth } from "./CheckAuth";
import { Provider } from "./Provider";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";
import { cookies } from "next/headers";
import { ztNotification } from "@/Types/Notification";
import { linkToQueryPosts } from "@/utils/LinkToQuery";
import Chatbox from "../uiOwnCreation/Chatbox";
import { socketConversations } from "@/lib/socket";
import { socketNameEmit } from "@/utils/SocketName";
import { useUserStore } from "@/lib/useUserStore";

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
