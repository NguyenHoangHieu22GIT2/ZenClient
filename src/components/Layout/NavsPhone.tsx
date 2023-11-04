"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import jsCookie from "js-cookie";

export const NavsPhone = (props: {}) => {
  const userId = jsCookie.get("userId");
  const router = useRouter();
  const logoutFn = useCallback(() => {
    router.replace("/login");
    jsCookie.remove("userId");
  }, []);
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
      {userId ? (
        <DropdownMenuItem>
          <Button
            className="text-xl text-left"
            onClick={logoutFn}
            variant={"link"}
          >
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
