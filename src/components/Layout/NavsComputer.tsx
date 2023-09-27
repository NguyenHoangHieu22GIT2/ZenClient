"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/lib/storeZustand";

export const NavsComputer = (props: {}) => {
  const { theme, setTheme } = useTheme();
  const access_token = useAuthStore((state) => state.access_token);
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <Link className="text-xl" href="/users/1">
          Your page
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        {/*TODO:Change this back to a button with functionality*/}
        <Button
          className="text-xl text-left font-medium p-0"
          variant={"link"}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          Theme
        </Button>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link className="text-xl" href="/settings">
          Settings
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      {access_token ? (
        <DropdownMenuItem>
          <Link className="text-xl" href="/logout">
            Logout
          </Link>
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
