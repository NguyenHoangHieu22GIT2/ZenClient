import { create } from "zustand";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

type authStoreType = {
  access_token: string;
  changeAccessToken: (access_token: string) => void;
  clearAccessToken: () => void;
};

export const useAuthStore = create<authStoreType>()((set) => ({
  access_token: cookie.get("jwtToken") || "",
  changeAccessToken: (newToken) =>
    set(() => {
      console.log(newToken);
      return { access_token: newToken };
    }),
  clearAccessToken: () => set(() => ({ access_token: "" })),
}));
