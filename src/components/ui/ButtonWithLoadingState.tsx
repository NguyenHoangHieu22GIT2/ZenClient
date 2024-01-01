import React, { PropsWithChildren } from "react";
import { Button } from "./button";
import { PropsClassName } from "@/Types/Props";
import Image from "next/image";

type props = {
  isLoading: boolean;
} & PropsClassName &
  PropsWithChildren;

export const ButtonWithLoadingState = React.memo((props: props) => {
  return (
    <Button type="submit" disabled={props.isLoading ? true : false}>
      {props.isLoading ? (
        <Image
          src={"/LoadingTransparent.svg"}
          alt="Loading"
          width={50}
          height={50}
        />
      ) : (
        <h1>{props.children}</h1>
      )}
    </Button>
  );
});
