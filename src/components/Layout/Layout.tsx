import React, { Fragment, PropsWithChildren } from "react";
import { Header } from "./Header";

export const Layout = (props: PropsWithChildren) => {
  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
    </Fragment>
  );
};
