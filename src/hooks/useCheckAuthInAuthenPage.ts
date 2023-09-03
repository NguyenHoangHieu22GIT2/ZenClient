"use client";
import { useAuthStore } from "@/lib/storeZustand";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useCheckAuthInAuthenPage() {
  const router = useRouter();
  const access_token = useAuthStore((state) => state.access_token);
  useEffect(() => {
    if (access_token) {
      router.replace("/");
    }
  }, [access_token]);
}
