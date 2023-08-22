import React, { PropsWithChildren, ReactNode } from "react";
import { PropsClassName } from "@/Types/Props";
import { cn } from "@/lib/utils";

interface props extends PropsClassName {
  children: ReactNode;
}

export const Heading = (props: props) => {
  return (
    <h1
      // className={`scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl ${props.className}`}>
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl",
        props.className,
      )}
    >
      {props.children}
    </h1>
  );
};
