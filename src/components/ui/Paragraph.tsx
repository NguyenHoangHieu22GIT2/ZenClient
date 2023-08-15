import React, { PropsWithChildren, PropsWithoutRef } from "react";

export const Paragraph = (props: PropsWithChildren) => {
  return <p className="leading-7 ">{props.children}</p>;
};
