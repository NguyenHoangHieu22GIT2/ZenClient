import { create } from "zustand";
import { Cookies } from "react-cookie";

type chatSystemStoreType = {
  isNotified: boolean;

  changeNotified: (notify: boolean) => void;
  clearNotified: () => void;
};

export const useChatSystemStore = create<chatSystemStoreType>()((set) => ({
  isNotified: false,

  changeNotified: (notified) =>
    set(() => {
      return { isNotified: notified };
    }),
  clearNotified: () =>
    set(() => ({
      isNotified: false,
    })),
}));
