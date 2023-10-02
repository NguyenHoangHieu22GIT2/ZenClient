import React, { ReactNode } from "react";
import { Header } from "./Header";
import { PropsClassName } from "@/Types/Props";
import { CheckAuth } from "./CheckAuth";
import { Provider } from "./Provider";
interface props extends PropsClassName {
  children: ReactNode;
}

export const Layout = (props: props) => {
  return (
    <Provider>
      <CheckAuth />
      <section className={props.className}>
        <Header />
        <main className="">{props.children}</main>
      </section>
    </Provider>
  );
};
