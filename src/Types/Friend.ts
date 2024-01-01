import { z } from "zod";
import { UserId, zUser } from "./User";

export const zFriendDocument = z.object({
  _id: UserId,
  userId: UserId,
  friends: z.array(UserId),
  await: z.array(UserId),
  wait: z.array(UserId),
  notInterested: z.array(UserId),
  followers: z.array(UserId),
  followings: z.array(UserId),
});

export const zAddFriend = z.object({
  hasSent: z.boolean(),
});

export type ztAddFriend = z.infer<typeof zAddFriend>;

export type ztFriendDocument = z.infer<typeof zFriendDocument>;
