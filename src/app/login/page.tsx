"use client";
import { Login } from "@/components/Authentication/Login";
import { Layout } from "@/components/Layout/Layout";
import { useCheckAuthInAuthenPage } from "@/hooks/useCheckAuthInAuthenPage";
import { useAuthStore } from "@/lib/storeZustand";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function LoginPage(props: {}) {
  useCheckAuthInAuthenPage();
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Login />
      </div>
    </>
  );
}
