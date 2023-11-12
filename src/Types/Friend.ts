import { z } from "zod";
import { UserIdTransformer, zUser } from "./User";

export const zFriendDocument = z.object({
  _id: UserIdTransformer,
  userId: UserIdTransformer,
  friends: z.array(UserIdTransformer),
  await: z.array(UserIdTransformer),
  wait: z.array(UserIdTransformer),
  notInterested: z.array(UserIdTransformer),
  followers: z.array(UserIdTransformer),
  followings: z.array(UserIdTransformer),
});

export const zAddFriend = z.object({
  hasSent: z.boolean(),
});

export type ztAddFriend = z.infer<typeof zAddFriend>;

export type ztFriendDocument = z.infer<typeof zFriendDocument>;
