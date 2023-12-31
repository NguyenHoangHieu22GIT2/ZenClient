import { Register } from "@/components/Authentication/Register";
import React from "react";

export default async function page() {
  return (
    <div className="h-screen  relative md:flex md:items-center [&>*]:basis-1/2">
      <div className="h-full bg-register-page  bg-no-repeat bg-center bg-cover"></div>
      <div className="md:static  md:translate-x-0 md:translate-y-0 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ">
        <Register />
      </div>
    </div>
  );
}
