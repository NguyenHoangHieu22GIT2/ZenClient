import { DateConverter } from "@/utils/DateConverter";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type props = {
  msg: string;
  date: Date;
  isYourMessage: boolean;
};

export const Message = (props: props) => {
  if (props.isYourMessage) {
    return (
      <div className="text-right mr-4 relative ">
        <div>
          <div>
            <h1 className="inline-block mb-1 bg-green-400 rounded-full  px-5 py-2">
              {props.msg}
            </h1>
            <p className="text-muted-foreground">
              {DateConverter(props.date, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="absolute left-full">...</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-left relative">
        <h1 className="inline-block mb-1 bg-blue-400 rounded-full  px-5 py-2">
          {props.msg}
        </h1>
        <p className="text-muted-foreground">
          {DateConverter(props.date, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <div className="absolute left-full">...</div>
      </div>
    );
  }
};
