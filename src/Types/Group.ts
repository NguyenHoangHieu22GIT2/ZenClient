import { z } from "zod";
import { Brand } from "./Brand";
import { UserIdTransformer } from "./User";

export type GroupId = Brand<string, "GroupId">;

export const zGroup = z.object({
  _id: z.string(),
  groupName: z.string().min(5),
  groupDescription: z.string().min(10),
  userId: UserIdTransformer,
  groupAvatar: z.string().nullable(),
  groupAvatarFile: z
    .instanceof(File, {
      message: "You have to input a image here",
    })
    .optional(),
  postIds: z.array(z.string()),
  userIds: z.array(UserIdTransformer),
  isPrivate: z.boolean().default(true),
});
export const zGroupQueries = z.object({
  _id: z.string(),
  groupName: z.string(),
  groupDescription: z.string(),
  userId: UserIdTransformer,
  groupAvatar: z.string().nullable(),
  hasJoined: z.boolean(),
  postIds: z.array(z.string()),
  userIds: z.array(UserIdTransformer),
  isPrivate: z.boolean(),
});
export const zResultsOfGroupsInfiniteQuery = z.object({
  groups: z.array(zGroupQueries),
  groupsCount: z.number(),
});

export type ztResultsOfGroupsInfiniteQuery = z.infer<
  typeof zResultsOfGroupsInfiniteQuery
>;

export type ztGroup = z.infer<typeof zGroup>;

export type ztGroupQueries = z.infer<typeof zGroupQueries>;

export const zGroupCreate = zGroup.omit({
  postIds: true,
  userIds: true,
  userId: true,
  _id: true,
  groupAvatar: true,
});

export type ztGroupCreate = z.infer<typeof zGroupCreate>;
