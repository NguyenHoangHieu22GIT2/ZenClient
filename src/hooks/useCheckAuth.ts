"use client";
import { api } from "@/lib/axios.api";
import { useAuthStore } from "@/lib/storeZustand";
import { Bearer } from "@/utils/Bearer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useCheckAuth = () => {
  const access_token = useAuthStore((state) => state.access_token);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!access_token)
      router.push(pathname === "/register" ? "/register" : "/login");
    else if (pathname !== "/login" && pathname !== "/register") {
      api
        .post(
          "auth/validate-jwt-token",
          {
            token: access_token,
          },
          {
            headers: {
              authorization: Bearer(access_token),
            },
          }
        )
        .catch((_err) => {
          router.push("/login");
        });
    }
  }, []);
  return access_token;
};

export default useCheckAuth;
