import { create } from "zustand";
import { Cookies } from "react-cookie";
import jwt from "jwt-decode";
import { UserId, ztUserMinimalData } from "@/Types/User";
const cookie = new Cookies();

type authStoreType = {
  user: ztUserMinimalData;

  changeUser: (ztUserMinimalData: ztUserMinimalData) => void;
  clearUser: () => void;
};

export const useUserStore = create<authStoreType>()((set) => ({
  user: {
    _id: "",
    username: "",
    email: "",
    avatar: "",
  } as ztUserMinimalData,

  changeUser: (user) =>
    set(() => {
      const result = {
        avatar: user.avatar,
        email: user.email,
        username: user.username,
        _id: user._id,
      };

      return { user: result };
    }),
  clearUser: () =>
    set(() => ({
      user: {
        avatar: "",
        email: "",
        username: "",
        _id: "" as UserId,
      },
    })),
}));
