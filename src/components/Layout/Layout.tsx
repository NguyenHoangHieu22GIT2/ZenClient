import React, { ReactNode, useEffect } from "react";
import { Header } from "./Header";
import { PropsClassName } from "@/Types/Props";
import { CheckAuth } from "./CheckAuth";
import { Provider } from "./Provider";

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
