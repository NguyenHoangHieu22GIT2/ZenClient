"use client";
import { Login } from "@/components/Authentication/Login";
import { Layout } from "@/components/Layout/Layout";
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
