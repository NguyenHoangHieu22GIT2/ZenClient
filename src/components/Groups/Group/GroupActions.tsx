"use client";
import React, { useState } from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../../ui/input";
export const GroupActions = (props: {}) => {
  const [postIsAscending, setPostIsAscending] = useState(true);
  function changePostDirection() {
    setPostIsAscending((oldPostIsAscending) => !oldPostIsAscending);
  }
  function search() {}
  return (
    <div>
      <Card className="p-3 flex justify-stretch [&>*]:basis-1/3 gap-3">
        <Button onClick={changePostDirection} variant={"secondary"}>
          Posts{" "}
          {postIsAscending ? (
            <AiOutlineSortAscending />
          ) : (
            <AiOutlineSortDescending />
          )}
        </Button>
        <Popover>
          <PopoverTrigger className="">
            {/* <Button className="w-full" variant={"secondary"}> */}
            Search
            {/* </Button> */}
          </PopoverTrigger>
          <PopoverContent className="flex gap-2">
            <Input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  search();
                }
              }}
              type="text"
              placeholder="Search for posts"
            />
            <Button>Search</Button>
          </PopoverContent>
        </Popover>
        <Button variant={"secondary"}>Events</Button>
        <Button variant={"secondary"}>Members</Button>
      </Card>
    </div>
  );
};
