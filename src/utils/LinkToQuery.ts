type createLinkToQueryParameters = {
  url?: string;
  limit?: number;
  skip?: number;
  userId?: string;
  latter?: string;
};
function createLinkToQuery({
  latter,
  limit,
  skip,
  url,
  userId,
}: createLinkToQueryParameters) {
  return `${url}?userId=${userId}&limit=${limit}&skip=${skip}${latter}` as const;
}
type generalOptions = {
  limit: number;
  skip: number;
};
interface optionsQueryPosts extends generalOptions {
  userId: string;
  groupId: string;
}

export type findUsersType =
  | "not-interested"
  | "has-sent-request"
  | "normal-users";
export function linkToQueryPosts({
  limit,
  skip,
  userId,
  groupId,
}: Partial<optionsQueryPosts>) {
  return createLinkToQuery({
    url: "posts/get-posts",
    limit: limit,
    skip: skip,
    // latter: userId ? `userId=${userId}` : "",
    latter: `${userId ? `&userId=${userId}` : ""}${
      groupId ? `&groupId=${groupId}` : ""
    }`,
  });
  // return `posts/get-posts?limit=${options.limit}&skip=${options.skip}&userId=${options.userId}` as const;
}

interface optionsQueryUsers extends generalOptions {
  username: string;
  userId: string;
  usersType: findUsersType;
}

export function linkToQueryUsers(options: Partial<optionsQueryUsers>) {
  return createLinkToQuery({
    url: "users/get-users",
    limit: options.limit,
    skip: options.skip,
    latter: `&usersType=${options.usersType}&username=${options.username}`,
  });
  // if (options.username) {
  //   return `users/get-users?limit=${options.limit}&skip=${options.skip}&usersType=${options.usersType}&username=${options.username}`;
  // }
  // return `users/get-users?limit=${options.limit}&skip=${options.skip}&usersType=${options.usersType}`;
}

interface optionsQueryGroups extends generalOptions {
  groupName: string;
  userId: string;
  userIdGroups: string;
}

export function linkToQueryGroups(options: Partial<optionsQueryGroups>) {
  let latter = "";
  if (options.groupName) {
    latter += `&groupName=${options.groupName}`;
  }
  if (options.userIdGroups) {
    latter += `&userIdGroups=${options.userIdGroups}`;
  }
  return createLinkToQuery({
    url: "groups/find-groups",
    limit: options.limit,
    skip: options.skip,
    latter: latter,
    userId: options.userId,
  });
}
