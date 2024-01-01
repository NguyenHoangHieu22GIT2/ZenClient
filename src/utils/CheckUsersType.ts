import { filterReducerType } from "@/components/Friends/NotInterestedFriends";

export function checkUsersType(filterState: filterReducerType) {
  return filterState.isNotInterested
    ? "not-interested"
    : filterState.HasSentRequest
      ? "has-sent-request"
      : "normal-users";
}
