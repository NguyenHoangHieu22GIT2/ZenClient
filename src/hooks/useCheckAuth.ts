"use client";
import { api } from "@/lib/axios.api";
import { useAuthStore } from "@/lib/storeZustand";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useCheckAuth = () => {
  const access_token = useAuthStore((state) => state.access_token);
  const router = useRouter();
  useEffect(() => {
    if (!access_token) router.push("/login");
  }, []);
  return access_token;
};

export default useCheckAuth;
