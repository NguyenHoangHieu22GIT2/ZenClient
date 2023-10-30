import React, { ReactNode } from "react";
import { Header } from "./Header";
import { PropsClassName } from "@/Types/Props";
import { CheckAuth } from "./CheckAuth";
import { Provider } from "./Provider";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";
import { cookies } from "next/headers";
import { ztNotification } from "@/Types/Notification";
interface props extends PropsClassName {
  children: ReactNode;
}

export const Layout = async (props: props) => {
  try {
    const notificationResult = await api.get<ztNotification[]>("notification", {
      withCredentials: true,
    });
    return (
      <Provider>
        <section className={props.className}>
          <Header notifications={notificationResult.data} />
          <main className="">{props.children}</main>
        </section>
      </Provider>
    );
  } catch (error) {
    console.log(error);
    return <h1>Error</h1>;
  }
};
