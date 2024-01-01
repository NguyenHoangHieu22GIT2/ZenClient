import { z } from "zod";
import { Brand } from "./Brand";

export type UserId = Brand<string, "UserId">;
export const UserId = z.string().transform((data) => data as UserId);

export const zUserId = z.object({
  userId: UserId,
});

export type ztUserId = z.infer<typeof zUserId>;
export const zUser = z.object({
  _id: UserId,
  email: z.string(),
  // Question: should we put password in here ?
  password: z.string(),
  avatar: z.string(),
  avatarFile: z.any(),
  username: z.string(),
  gender: z.union([z.literal("male"), z.literal("female")]),
  description: z.string().optional(),
});

export const zFriendsInfo = z.object({
  _id: z.string(),
  userId: UserId,
  friends: z.array(z.string()),
  wait: z.array(z.string()),
  await: z.array(z.string()),
  followers: z.array(z.string()),
  followings: z.array(z.string()),
  notInterested: z.array(z.string()),
  isFollowing: z.boolean().optional(),
});

export const zUserInfoPage = z.object({
  user: zUser.omit({ password: true, avatarFile: true }),
  postsCount: z.number(),
  friendsInfo: z.object({
    userId: UserId,
    isFriend: z.boolean(),
    isFollowing: z.boolean(),
    friends: z.number(),
    followers: z.number(),
    followings: z.number(),
  }),
});

export type ztUserInfoPage = z.infer<typeof zUserInfoPage>;

export type ztUser = z.infer<typeof zUser>;

export const zUserMinimalData = zUser.pick({
  _id: true,
  email: true,
  username: true,
  avatar: true,
});

export type ztUserMinimalData = z.infer<typeof zUserMinimalData>;
export const zUserRegisterStepOne = zUser.pick({
  email: true,
  gender: true,
  password: true,
  username: true,
});

export type ztUserRegisterStepOne = z.infer<typeof zUserRegisterStepOne>;

export const zUserRegisterStepTwo = zUser.pick({
  email: true,
  gender: true,
  password: true,
  username: true,
  avatarFile: true,
});
export type ztUserRegisterStepTwo = z.infer<typeof zUserRegisterStepTwo>;

export const zLoginResponse = z.object({
  access_token: z.string(),
  userId: UserId,
});

export type ztLoginResponse = z.infer<typeof zLoginResponse>;

export const zUserInfo = z.object({
  user: zUser,
});
