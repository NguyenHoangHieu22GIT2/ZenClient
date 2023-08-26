"use client";
import { Login } from "@/app/_components/Authentication/Login";
import { Layout } from "@/app/_components/Layout/Layout";
import React from "react";

export default function LoginPage(props: {}) {
  return (
    <Layout>
      <div className="h-screen flex justify-center items-center">
        <Login />
      </div>
    </Layout>
  );
}
