"use client";
// THIS IS DEPRECATED, NOT GOING TO USE THIS :D
import { api } from "@/lib/axios.api";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import jsCookie from "js-cookie";
import { useUserStore } from "@/lib/useUserStore";
const useCheckAuth = () => {
  const changeUser = useUserStore((state) => state.changeUser);
  const router = useRouter();
  useEffect(() => {
    if (window) {
      api
        .get("auth/validate-jwt-token", { withCredentials: true })
        .then((result) => {
          changeUser(result.data);
          console.log(result.data);
        })
        .catch((err) => {
          jsCookie.remove("userId");
          router.replace("/login");
        });
    }
  }, []);
};

export default useCheckAuth;
