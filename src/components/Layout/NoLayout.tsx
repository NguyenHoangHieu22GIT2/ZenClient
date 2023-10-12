import React, { ReactNode } from "react";
import { PropsClassName } from "@/Types/Props";
import { Provider } from "./Provider";
interface props extends PropsClassName {
  children: ReactNode;
}

export const NoLayout = (props: props) => {
  return (
    <Provider>
      <section className={props.className}>
        <main className="">{props.children}</main>
      </section>
    </Provider>
  );
};
