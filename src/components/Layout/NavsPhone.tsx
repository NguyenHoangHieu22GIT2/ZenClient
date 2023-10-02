"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useAuthStore } from "@/lib/storeZustand";

export const NavsPhone = (props: {}) => {
  const access_token = useAuthStore((state) => state.access_token);
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <Link className="text-xl" href="/">
          Home
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link className="text-xl" href="/friends">
          Friends
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link className="text-xl" href="/messages">
          Messages
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link className="text-xl" href="/groups">
          Groups
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
