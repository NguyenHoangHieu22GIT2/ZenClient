"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useAuthStore } from "@/lib/storeZustand";
import { useRouter } from "next/navigation";
import { Cookies, useCookies } from "react-cookie";

type props = {
  userId: string;
};

export const NavsComputer = (props: props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwtToken"]);
  const access_token = useAuthStore((state) => state.access_token);
  const router = useRouter();
  const logoutFn = useCallback(() => {
    router.replace("/login");
    removeCookie("jwtToken");
  }, []);
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <Link className="text-xl" href={`/users/${props.userId}`}>
          Your page
        </Link>
      </DropdownMenuItem>
      {/* <DropdownMenuSeparator />
      <DropdownMenuItem>
        TODO:Change this back to a button with functionality
        <Button
          className="text-xl text-left font-medium p-0"
          variant={"link"}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          Theme
        </Button>
      </DropdownMenuItem> */}
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link className="text-xl" href="/settings">
          Settings
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      {access_token ? (
        <DropdownMenuItem>
          <Button onClick={logoutFn} className="text-xl" variant={"link"}>
            Logout
          </Button>
        </DropdownMenuItem>
      ) : (
        <>
          <DropdownMenuItem>
            <Link className="text-xl" href="/login">
              Login
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link className="text-xl" href="/register">
              Register
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </>
      )}
    </DropdownMenuGroup>
  );
};
