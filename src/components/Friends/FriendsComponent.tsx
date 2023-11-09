"use client";
import React, { useEffect, useReducer, useState } from "react";
import { FriendFilter } from "./FriendFilter";
import { RecommendFriends } from "./RecommendFriends";
import { UserId, ztUserMinimalData } from "@/Types/User";
import { HasSentRequestFriends } from "./HasSentRequestFriends";
import { Friends } from "./Friends";
import { apiUrlType } from "./NotInterestedFriends";
import { findUsersType } from "@/utils/LinkToQuery";
import { ztResultsOfFriendsInfiniteQuery } from "@/Types/resultsOfInfiniteQuery";
export type FilterActionType =
  | "SET_USERNAME"
  | "SET_NOT_INTERESTED"
  | "SET_HAS_SENT_REQUEST"
  | "CHANGE_ALL";
export type filterReducerType = {
  usernameFilter?: string;
  isNotInterested?: boolean;
  HasSentRequest?: boolean;
  friendsSentRequest?: boolean;
};

export interface FilterAction {
  type: FilterActionType;
  payload: filterReducerType;
}
function filterReducer(
  state: filterReducerType,
  action: FilterAction
): filterReducerType {
  if (action.type === "SET_USERNAME") {
    return {
      ...state,
      usernameFilter: action.payload.usernameFilter,
    };
  } else if (action.type === "SET_NOT_INTERESTED") {
    return {
      ...state,
      isNotInterested: action.payload.isNotInterested,
      friendsSentRequest: false,
      HasSentRequest: false,
    };
  } else if (action.type === "SET_HAS_SENT_REQUEST") {
    return {
      ...state,
      HasSentRequest: action.payload.HasSentRequest,
      isNotInterested: false,
      friendsSentRequest: false,
    };
  } else if (action.type === "CHANGE_ALL") {
    return {
      usernameFilter: action.payload.usernameFilter,
      isNotInterested: action.payload.isNotInterested,
      HasSentRequest: action.payload.HasSentRequest,
      friendsSentRequest: action.payload.friendsSentRequest,
    };
  }
  return state;
}

type props = {
  criteria: {
    username: string;
    usersType: findUsersType;
  };
};

export default function FriendsComponent(props: props) {
  const [users, setUsers] = useState<ztUserMinimalData[]>([]);
  function removeUserNotInterested(userId: UserId) {
    setUsers((users) => {
      return users.filter((user) => user._id.toString() !== userId.toString());
    });
  }

  const [filterState, filterDispatch] = useReducer<typeof filterReducer>(
    filterReducer,
    {
      HasSentRequest: props.criteria.usersType === "has-sent-request",
      isNotInterested: props.criteria.usersType === "not-interested",
      usernameFilter: props.criteria.username || "  ",
    }
  );

  function changeFilter({
    type,
    payload,
  }: {
    type: FilterActionType;
    payload: filterReducerType;
  }) {
    if (
      filterState.usernameFilter !== payload.usernameFilter ||
      filterState.HasSentRequest !== payload.HasSentRequest ||
      filterState.isNotInterested !== payload.isNotInterested
    ) {
      setUsers([]);
    }
    filterDispatch({
      type,
      payload,
    });
  }

  function changeResetFilter() {
    filterDispatch({
      type: "SET_USERNAME",
      payload: { usernameFilter: "" },
    });
  }
  return (
    <div className="flex md:flex-row  flex-col gap-2 [&>*:first-child]:basis-1/4 [&>*:last-child]:basis-3/4">
      <FriendFilter
        onChangeResetFilter={changeResetFilter}
        onChangeFilter={changeFilter}
        filterState={filterState}
        criteria={props.criteria}
      />
      <Friends
        filterState={filterState}
        onChangeFilter={changeFilter}
        users={users}
        setUsers={setUsers}
        onRemoveUserNotInterested={removeUserNotInterested}
      />
    </div>
  );
}
