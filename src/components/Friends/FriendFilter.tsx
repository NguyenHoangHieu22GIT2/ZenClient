"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AiOutlineSearch } from "react-icons/ai";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { FilterActionType, filterReducerType } from "./NotInterestedFriends";
import { findUsersType } from "@/utils/LinkToQuery";
type props = {
  onChangeFilter: (data: {
    type: FilterActionType;
    payload: filterReducerType;
  }) => void;
  onChangeResetFilter: () => void;
  filterState: filterReducerType;
  criteria: {
    username: string;
    usersType: findUsersType;
  };
};
export const FriendFilter = (props: props) => {
  const [filter, setFilter] = useState(props.criteria.username || "");
  const [openCriteria, setOpenCriteria] = useState(false);
  const [notInterested, setNotInterested] = useState(
    props.criteria.usersType === "not-interested" ? true : false,
  );
  const [hasSentRequest, setHasSentRequest] = useState(
    props.criteria.usersType === "has-sent-request" ? true : false,
  );
  const style = openCriteria ? "block" : "";
  function changeFilter() {
    //CHANGE THE URL WITHOUT REFRESHING THE PAGE...
    window.history.pushState(
      null,
      "Friends",
      `/friends?searchInput=${filter}&usersType=${notInterested
        ? "not-interested"
        : hasSentRequest
          ? "has-sent-request"
          : "normal-users"
      }`,
    );
    props.onChangeFilter({
      type: "CHANGE_ALL",
      payload: {
        usernameFilter: filter,
        HasSentRequest: hasSentRequest,
        isNotInterested: notInterested,
      },
    });
  }
  return (
    <div className="">
      <div className="mb-5">
        <h1 className="font-bold mb-1">Search:</h1>
        <div className="flex gap-2">
          <Input
            onChange={(e) => setFilter(e.target.value)}
            placeholder="name of the user"
            defaultValue={filter}
            type="text"
          />
          <Button
            onClick={() => {
              if (filter) changeFilter();
              else props.onChangeResetFilter();
            }}
          >
            <AiOutlineSearch />
          </Button>
        </div>
      </div>
      {/* TODO:FEATURE WILL BE ADDED IN THE FUTURE */}
      {/* <div className={cn("mb-5 hidden md:block", style)}>
        <h1 className="font-bold mb-1">Distance:</h1>
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5km" id="r1" />
            <Label htmlFor="r1">{"<"}5Km</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="10km" id="r2" />
            <Label htmlFor="r2">{"<"}10Km</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="50km" id="r3" />
            <Label htmlFor="r3">{"<"}50Km</Label>
          </div>
        </RadioGroup>
      </div> */}
      <div className={cn("mb-5 hidden md:block", style)}>
        <h1 className="font-bold mb-1">Criteria:</h1>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Checkbox id="terms" title="Relative with your friends" />
            <Label>Relative with your friends.</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={notInterested}
              onCheckedChange={(checked: boolean) => {
                setNotInterested(checked);
                setHasSentRequest(false);
              }}
              id="notInterested"
              title="Not interested friend"
            />
            <Label htmlFor="notInterested">Not interested friend.</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={hasSentRequest}
              onCheckedChange={(checked: boolean) => {
                setHasSentRequest(checked);
                setNotInterested(false);
              }}
              id="hasSentRequest"
              title="Friends that have sent the request"
            />
            <Label htmlFor="hasSentRequest">
              Friends that have sent the request.
            </Label>
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          changeFilter();
        }}
        className={cn("w-full hidden md:block", style)}
      >
        Filter
      </Button>
      <Button
        className={cn("w-full md:hidden", openCriteria && "hidden")}
        onClick={() => setOpenCriteria(true)}
      >
        More Criteria
      </Button>
    </div>
  );
};
