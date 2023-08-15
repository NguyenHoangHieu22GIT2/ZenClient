"use client";
import { Container } from "@/components/ui/Container";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { Bars } from "../ui/SVG/Bars";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const Header = (props: {}) => {
  return (
    <header className="py-2 bg-slate-100">
      <Container>
        <div className="flex justify-between items-center">
          <main>
            <h1 className="font-bold text-2xl">Poddy</h1>
          </main>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onClick={() => {
                  console.log("Hello world");
                }}
                className="bg-slate-200 text-slate-600 hover:bg-slate-300 transition border-slate-100 border-2"
              >
                <Bars />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
                  <Link className="text-xl" href="/posts">
                    Posts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link className="text-xl" href="/login">
                    Login
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Container>
    </header>
  );
};
