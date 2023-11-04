import { z } from "zod";
import { Brand } from "./Brand";

export type UserId = Brand<string, "UserId">;
export const UserIdTransformer = z.string().transform((data) => data as UserId);

export const zUser = z.object({
  _id: UserIdTransformer,
  email: z.string(),
  // Question: should we put password in here ?
  password: z.string(),
  avatar: z.string(),
  avatarFile: typeof window === "undefined" ? z.null() : z.instanceof(File),
  username: z.string(),
  gender: z.union([z.literal("male"), z.literal("female")]),
});

export const zFriendsInfo = z.object({
  _id: z.string(),
  userId: UserIdTransformer,
  friends: z.array(z.string()),
  wait: z.array(z.string()),
  await: z.array(z.string()),
  followers: z.array(z.string()),
  followings: z.array(z.string()),
  notInterested: z.array(z.string()),
});

export const zUserPage = z.object({
  user: zUser.omit({ password: true, avatarFile: true }),
  postsCount: z.number(),
  friendsInfo: zFriendsInfo,
});

export type ztUserPage = z.infer<typeof zUserPage>;

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
  userId: UserIdTransformer,
});

export type ztLoginResponse = z.infer<typeof zLoginResponse>;

export const zUserInfo = z.object({
  user: zUser,
});
