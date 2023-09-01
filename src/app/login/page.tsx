"use client";
import { Login } from "@/components/Authentication/Login";
import { Layout } from "@/components/Layout/Layout";
import { useAuthStore } from "@/lib/storeZustand";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function LoginPage(props: {}) {
  // const router = useRouter();
  // const access_token = useAuthStore((state) => state.access_token);
  // useEffect(() => {
  //   if (access_token) {
  //     router.replace("/");
  //   }
  // }, [access_token]);
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Login />
      </div>
    </>
  );
}
