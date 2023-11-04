type createLinkToQueryParameters = {
  url?: string;
  limit?: number;
  skip?: number;
  latter?: string;
};
function createLinkToQuery({
  latter,
  limit,
  skip,
  url,
}: createLinkToQueryParameters) {
  return `${url}?limit=${limit}&skip=${skip}&${latter}` as const;
}
type generalOptions = {
  limit: number;
  skip: number;
};
interface optionsQueryPosts extends generalOptions {
  userId: string;
  postIds: string[];
}

export type findUsersType =
  | "not-interested"
  | "has-sent-request"
  | "normal-users";
export function linkToQueryPosts(options: Partial<optionsQueryPosts>) {
  return createLinkToQuery({
    url: "posts/get-posts",
    limit: options.limit,
    skip: options.skip,
    latter: `userId=${options.userId}`,
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
    latter: `usersType=${options.usersType}&username=${options.username}`,
  });
  // if (options.username) {
  //   return `users/get-users?limit=${options.limit}&skip=${options.skip}&usersType=${options.usersType}&username=${options.username}`;
  // }
  // return `users/get-users?limit=${options.limit}&skip=${options.skip}&usersType=${options.usersType}`;
}

interface optionsQueryGroups extends generalOptions {
  groupName: string;
}

export function linkToQueryGroups(options: Partial<optionsQueryGroups>) {
  return createLinkToQuery({
    url: "groups/find-groups",
    limit: options.limit,
    skip: options.skip,
    latter: options.groupName ? `groupName=${options.groupName}` : "",
  });
}
