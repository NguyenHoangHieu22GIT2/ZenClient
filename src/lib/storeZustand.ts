import { create } from "zustand";
import { Cookies } from "react-cookie";
import jwt from "jwt-decode";
import { ztUserMinimalData } from "@/Types/User";
const cookie = new Cookies();

type authStoreType = {
  access_token: string;
  _id: string;
  username: string;
  email: string;
  avatar: string;
  changeAccessToken: (access_token: string) => void;
  clearAccessToken: () => void;
};

export type userStore = ztUserMinimalData;

export const useAuthStore = create<authStoreType>()((set) => ({
  access_token: cookie.get("jwtToken") || "",
  _id: "",
  username: "",
  email: "",
  avatar: "",
  changeAccessToken: (newToken) =>
    set(() => {
      const user: userStore | "" = newToken && jwt(newToken);
      return {
        access_token: newToken,
        avatar: user && user.avatar,
        email: user && user.email,
        username: user && user.username,
        _id: user && user._id,
      };
    }),
  clearAccessToken: () => set(() => ({ access_token: "" })),
}));
