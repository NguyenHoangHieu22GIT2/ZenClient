import { create } from "zustand";
import { Cookies } from "react-cookie";
import jwt from "jwt-decode";
import { User } from "@/Types/User";
const cookie = new Cookies();

const token = cookie.get("jwtToken") || "";

type authStoreType = {
  access_token: string;
  username: string;
  email: string;
  avatar: string;
  changeAccessToken: (access_token: string) => void;
  clearAccessToken: () => void;
};

const user: Pick<User, "avatar" | "email" | "username"> | "" =
  token && jwt(token);

export const useAuthStore = create<authStoreType>()((set) => ({
  access_token: cookie.get("jwtToken") || "",
  username: user && user.username,
  email: user && user.email,
  avatar: user && user.avatar,
  changeAccessToken: (newToken) =>
    set(() => {
      const user: Pick<User, "avatar" | "email" | "username"> =
        token && jwt(newToken);
      return {
        access_token: newToken,
        avatar: user.avatar,
        email: user.email,
        username: user.username,
      };
    }),
  clearAccessToken: () => set(() => ({ access_token: "" })),
}));
