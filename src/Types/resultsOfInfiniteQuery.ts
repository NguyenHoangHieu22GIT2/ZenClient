import { z } from "zod";
import { zUserMinimalData } from "./User";

export type ztResultsOfFriendsInfiniteQuery = z.infer<
  typeof zResultsOfFriendsInfiniteQuery
>;

export const zResultsOfFriendsInfiniteQuery = z.object({
  users: z.array(zUserMinimalData),
  usersCount: z.number(),
});
