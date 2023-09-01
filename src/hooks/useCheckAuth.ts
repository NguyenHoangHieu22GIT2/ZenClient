"use client";
import { api } from "@/lib/axios.api";
import { useAuthStore } from "@/lib/storeZustand";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useCheckAuth = (access_token: string) => {
  // const checkUserQuery = useQuery({
  //   queryKey: ["authAccessToken"],
  //   queryFn: async () => {
  //     return api
  //       .get("/users/validateUser", {
  //         headers: { setAuthorization: `bearer ${access_token}` },
  //       })
  //       .then((result) => result.data);
  //   },
  // });
  const router = useRouter();
  useEffect(() => {
    if (!access_token) router.push("/login");
    else {
    }
  }, []);
  return access_token;
};

export default useCheckAuth;
