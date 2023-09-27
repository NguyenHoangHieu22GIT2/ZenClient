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
        {/* <Header /> */}
        <main className="">{props.children}</main>
      </section>
    </Provider>
  );
};
