import { create } from "zustand";
import { UserId, ztUserMinimalData } from "@/Types/User";

type authStoreType = {
  user: ztUserMinimalData;
  isAdmin: boolean
  changeUser: (ztUserMinimalData: ztUserMinimalData, isAuth?: boolean) => void;
  clearUser: () => void;
};

export const useUserStore = create<authStoreType>()((set) => ({
  user: {
    _id: "",
    username: "",
    email: "",
    avatar: "",
  } as ztUserMinimalData,

  changeUser: (user, isAdmin = false) =>
    set(() => {
      const result = {
        avatar: user.avatar,
        email: user.email,
        username: user.username,
        _id: user._id,
      };

      return { user: result, isAdmin };
    }),
  clearUser: () =>
    set(() => ({
      user: {
        avatar: "",
        email: "",
        username: "",
        _id: "" as UserId,
      },
      isAdmin: false
    })),
  isAdmin: false
}));
