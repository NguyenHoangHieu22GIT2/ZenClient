import { create } from "zustand";
import { Cookies } from "react-cookie";
import jwt from "jwt-decode";
import { User } from "@/Types/User";
const cookie = new Cookies();

const token = cookie.get("jwtToken") || "";

type authStoreType = {
  access_token: string;
  _id: string;
  username: string;
  email: string;
  avatar: string;
  changeAccessToken: (access_token: string) => void;
  clearAccessToken: () => void;
};

type userStore = Pick<User, "avatar" | "email" | "username" | "_id">;

const user: userStore | "" = token && jwt(token);

console.log(user);

export const useAuthStore = create<authStoreType>()((set) => ({
  access_token: cookie.get("jwtToken") || "",
  _id: user && user._id,
  username: user && user.username,
  email: user && user.email,
  avatar: user && user.avatar,
  changeAccessToken: (newToken) =>
    set(() => {
      const user: userStore = token && jwt(newToken);
      return {
        access_token: newToken,
        avatar: user.avatar,
        email: user.email,
        username: user.username,
        _id: user._id,
      };
    }),
  clearAccessToken: () => set(() => ({ access_token: "" })),
}));
