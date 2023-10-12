import { Brand } from "./Brand";

export type UserId = Brand<string, "UserId">;

export type User = {
  _id: UserId;
  email: string;
  password: string;
  avatar: string;
  avatarFile: File;
  username: string;
  gender: "male" | "female";
  badge: string;
};

export type UserMinimalData = Pick<
  User,
  "_id" | "email" | "username" | "avatar"
>;

export type UserRegisterStepOne = Pick<
  User,
  "email" | "gender" | "password" | "username"
>;
export type UserRegisterStepTwo = Pick<
  User,
  "email" | "gender" | "password" | "username" | "avatar"
>;
