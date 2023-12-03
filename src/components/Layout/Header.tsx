"use client";
import { Container } from "@/components/ui/Container";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Bars } from "../ui/SVG/Bars";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { NotificationNav } from "../Notification/NotificationNav";
import { Input } from "../ui/input";
import { NavsPhone } from "./NavsPhone";
import { NavsComputer } from "./NavsComputer";
import { HeaderNavigation } from "../Header/Navigation";

import { UserAvatarLink } from "../Header/UserAvatarLink";
import { UserAvatarHoverCard } from "../Header/UserAvatarHoverCard";
import { useUserStore } from "@/lib/useUserStore";

export const Header = (props: {}) => {
  const user = useUserStore((state) => state.user);
  const notificationNav = <NotificationNav />;
  return (
    <header className="py-2 z-40 dark:bg-slate-800/80 bg-slate-100/80 backdrop-blur-lg sticky top-0">
      <Container>
        <div className="flex justify-between  w-full items-center">
          <main className="flex basis-2/4 gap-5 items-center">
            <Button variant={"link"} className="p-0 m-0">
              <Link href={"/"} className="font-bold text-2xl">
                Zed
              </Link>
            </Button>
            <Input
              className="w-full"
              placeholder="Search in Zed is fast and convenient"
            />
          </main>
          {/* For computers */}
          <nav className="hidden md:block">
            <HeaderNavigation />
          </nav>
          {/* The Div is the problem */}
          <div className="md:flex md:items-center md:gap-5 hidden ">
            {notificationNav}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="p-0  text-slate-600 hover:bg-transparent  transition bg-tranparent ">
                  <UserAvatarHoverCard user={user} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <NavsComputer userId={user._id} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* For Phone */}
          <div className="flex md:hidden items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-slate-200 text-slate-600 hover:bg-slate-300 transition border-slate-100 border-2">
                  <Bars />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <NavsPhone />
              </DropdownMenuContent>
            </DropdownMenu>
            {notificationNav}
            <UserAvatarLink user={user} />
          </div>
        </div>
      </Container>
    </header>
  );
};
