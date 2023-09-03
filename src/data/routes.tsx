import { Button } from "@/components/ui/button";
import Link from "next/link";

export const pages = [
  {
    auth: false,
    forPhone: true,
    element: (
      <Link className="text-xl" href={"/"}>
        {"Home"}
      </Link>
    ),
  },
  {
    auth: true,
    forPhone: true,
    element: (
      <Link className="text-xl" href={"/posts"}>
        {"Posts"}
      </Link>
    ),
  },
  {
    auth: false,
    forPhone: true,
    element: (
      <Link className="text-xl" href={"/friends"}>
        {"Friends"}
      </Link>
    ),
  },
  {
    auth: true,
    forPhone: true,
    element: (
      <Link className="text-xl" href={"/messages"}>
        {"Messages"}
      </Link>
    ),
  },
  {
    auth: false,
    forPhone: true,
    element: (
      <Link className="text-xl" href={"/groups"}>
        {"Groups"}
      </Link>
    ),
  },
  {
    auth: true,
    forPhone: false,
    element: (
      <Link className="text-xl" href={"/users/1"}>
        {"Your Page"}
      </Link>
    ),
  },
  {
    auth: true,
    forPhone: true,
    element: (
      <Link className="text-xl" href={"/settings"}>
        {"Settings"}
      </Link>
    ),
  },
  {
    auth: false,
    forPhone: "both",

    element: (
      <Link className="text-xl" href={"/login"}>
        {"Login"}
      </Link>
    ),
  },
  {
    auth: false,
    forPhone: "both",
    element: (
      <Link className="text-xl" href={"/register"}>
        {"Register"}
      </Link>
    ),
  },
  {
    auth: true,
    forPhone: "both",
    element: (
      <Link className="text-xl" href={"/logout"}>
        {"Logout"}
      </Link>
    ),
  },
];
