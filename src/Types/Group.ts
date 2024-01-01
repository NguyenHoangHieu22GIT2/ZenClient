import { z } from "zod";
import { Brand } from "./Brand";
import { UserId } from "./User";
import { zChangeGroupInfoWithoutAvatarDto } from "@/dtos/group/group-info.dto";

export type GroupId = Brand<string, "GroupId">;

export const GroupId = z.string().transform((data) => data as GroupId);
export const zGroup = z.object({
  _id: GroupId,
  groupName: z.string().min(5),
  groupDescription: z.string().min(50),
  userId: UserId,
  groupAvatar: z.string().nullable(),
  groupAvatarFile:
    typeof window === "undefined"
      ? z.null()
      : z
          .instanceof(File, {
            message: "You have to input a image here",
          })
          .optional(),
  postIds: z.array(z.string()),
  userIds: z.array(UserId),
  isPrivate: z.boolean().default(true),
});

export const zGroupMinimal = zGroup.pick({
  _id: true,
  groupAvatar: true,
  groupName: true,
  isPrivate: true,
  groupDescription: true,
});

export const zArrayGroupMinimal = z.array(zGroupMinimal);
export type ztArrayGroupMinimal = z.infer<typeof zArrayGroupMinimal>;

export const zGroupQueries = z.object({
  _id: GroupId,
  groupName: z.string(),
  groupDescription: z.string(),
  userId: UserId,
  groupAvatar: z.string().nullable(),
  hasJoined: z.boolean(),
  postIds: z.array(z.string()),
  userIds: z.array(UserId),
  isPrivate: z.boolean(),
  areYouTheHost: z.boolean(),
});
export const zResultsOfGroupsInfiniteQuery = z.object({
  groups: z.array(zGroupQueries),
  groupsCount: z.number(),
});

export type ztGroupMinimal = z.infer<typeof zGroupMinimal>;

export type ztResultsOfGroupsInfiniteQuery = z.infer<
  typeof zResultsOfGroupsInfiniteQuery
>;

export const zOutGroup = z.object({
  groupId: GroupId,
  userId: UserId,
});

export type ztOutGroup = z.infer<typeof zOutGroup>;

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
export const zResultOfInfiniteQueryFindGroupsJoined = z.object({
  groupsCount: z.number(),
  groups: z.array(zGroupMinimal),
});

export type ztResultOfInfiniteQueryFindGroupsJoined = z.infer<
  typeof zResultOfInfiniteQueryFindGroupsJoined
>;
