"use client";
import { Register } from "@/components/Authentication/Register";
import { Layout } from "@/components/Layout/Layout";
import React from "react";

export default function page() {
  console.log(process.env.NEXT_PUBLIC_SERVER_URL)
  return (
    <>
      <div className="h-screen relative md:flex [&>*]:basis-1/2">
        <div className="h-full bg-register-page  bg-no-repeat bg-center bg-cover"></div>
        <div className="md:static md:translate-x-0 md:translate-y-0 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ">
          <Register />
        </div>
      </div>
    </>
  );
}
