import { z } from "zod";
import { Brand } from "./Brand";

export type UserId = Brand<string, "UserId">;
const UserIdTransformer = z.string().transform((data) => data as UserId);

export const zUser = z.object({
  _id: UserIdTransformer,
  email: z.string(),
  password: z.string(),
  avatar: z.string(),
  avatarFile: typeof window === "undefined" ? z.null() : z.instanceof(File),
  username: z.string(),
  gender: z.union([z.literal("male"), z.literal("female")]),
  badge: z.string(),
});

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
