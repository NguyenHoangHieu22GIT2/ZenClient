import React, { PropsWithChildren } from "react";

export const Username = (props: PropsWithChildren) => {
  return (
    <h1 className="scroll-m-20 text-xl font-semibold tracking-tight lg:text-sm">
      {props.children}
    </h1>
  );
};
