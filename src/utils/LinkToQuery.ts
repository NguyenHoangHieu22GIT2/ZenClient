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
  return `posts/get-posts?limit=${options.limit}&skip=${options.skip}&userId=${options.userId}` as const;
}

interface optionsQueryUsers extends generalOptions {
  username: string;
  userId: string;
  usersType: findUsersType;
}

export function linkToQueryUsers(options: Partial<optionsQueryUsers>) {
  if (options.username) {
    return `users/get-users?limit=${options.limit}&skip=${options.skip}&usersType=${options.usersType}&username=${options.username}`;
  }
  return `users/get-users?limit=${options.limit}&skip=${options.skip}&usersType=${options.usersType}&userId=${options.userId}`;
}
