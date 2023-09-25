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
};
