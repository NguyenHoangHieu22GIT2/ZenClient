import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

type props = {
  hasAccessToken: boolean;
  setTheme: (mode: string) => void;
  theme: string | undefined;
};

export const NavsComputer = (props: props) => {
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
          onClick={() =>
            props.setTheme(props.theme === "light" ? "dark" : "light")
          }
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
      {props.hasAccessToken ? (
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
