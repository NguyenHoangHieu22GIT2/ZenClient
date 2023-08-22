import { PropsClassName } from "@/Types/Props";
import React, { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface props extends PropsClassName {
  children: ReactNode;
}

export const Container = (props: props) => {
  return (
    <div
      // className={`${props.className} max-w-sm md:max-w-md lg:max-w-7xl mx-auto`}
      className={cn(
        "max-w-xl md:max-w-4xl lg:max-w-7xl lg:px-2 mx-auto",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};
