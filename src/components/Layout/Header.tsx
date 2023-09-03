"use client";
import { Container } from "@/components/ui/Container";
import React from "react";
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
import { GoHomeFill, GoHome } from "react-icons/go";
import {
  BsPostcard,
  BsPeople,
  BsPeopleFill,
  BsPostcardFill,
} from "react-icons/bs";
import {
  BiGroup,
  BiMessageSquareDetail,
  BiSolidGroup,
  BiSolidMessageSquareDetail,
} from "react-icons/bi";
import { NotificationNav } from "../Notification/NotificationNav";
import { AvatarHoverCard } from "../ui/AvatarHoverCard";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Input } from "../ui/input";
import { useAuthStore } from "../../lib/storeZustand";
import { NavsPhone } from "./NavsPhone";
import { NavsComputer } from "./NavsComputer";
export const Header = React.memo(() => {
  const access_token = useAuthStore((state) => state.access_token);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  return (
    <header className="py-2 z-50 dark:bg-slate-800/80 bg-slate-100/80 backdrop-blur-lg sticky top-0">
      <Container>
        <div className="flex justify-between  w-full items-center">
          <main className="flex basis-2/4 gap-5 items-center">
            <Button variant={"link"} className="p-0 m-0">
              <Link href={"/"} className="font-bold text-2xl">
                Poddy
              </Link>
            </Button>
            <Input
              className="w-full"
              placeholder="Search in Poddy is fast and convenient"
            />
          </main>
          {/* For computers */}
          <nav className="hidden md:block">
            <ul className="flex gap-5">
              <li className="text-3xl">
                <Link href="/">
                  {pathname === "/" ? <GoHomeFill /> : <GoHome />}
                </Link>
              </li>
              <li className="text-3xl">
                <Link href="/posts">
                  {pathname === "/posts" ? <BsPostcardFill /> : <BsPostcard />}
                </Link>
              </li>
              <li className="text-3xl">
                <Link href="/friends">
                  {pathname === "/friends" ? <BsPeopleFill /> : <BsPeople />}
                </Link>
              </li>
              <li className="text-3xl">
                <Link href="/messages">
                  {pathname === "/messages" ? (
                    <BiSolidMessageSquareDetail />
                  ) : (
                    <BiMessageSquareDetail />
                  )}
                </Link>
              </li>
              <li className="text-3xl">
                <Link href="/groups">
                  {pathname === "/groups" ? <BiSolidGroup /> : <BiGroup />}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="md:flex md:items-center md:gap-5 hidden ">
            <NotificationNav />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="p-0  text-slate-600 hover:bg-transparent  transition bg-tranparent ">
                  <AvatarHoverCard
                    username="User"
                    avatarUrl={
                      access_token
                        ? "https://github.com/shadcn.png"
                        : "/default-user.jpeg"
                    }
                    // avatarUrl="https://github.com/shadcn.png"
                    yearOfJoined={0}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <NavsComputer
                  theme={theme}
                  setTheme={setTheme}
                  hasAccessToken={access_token.length > 0}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* For Phone */}
          <div className="flex md:hidden items-center gap-2">
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
                <NavsPhone hasAccessToken={access_token.length > 0} />
              </DropdownMenuContent>
            </DropdownMenu>
            <NotificationNav />
            <Link href={access_token ? "/users/1" : "/login"}>
              <AvatarHoverCard
                username="User"
                avatarUrl={
                  access_token
                    ? "https://github.com/shadcn.png"
                    : "/default-user.jpeg"
                }
                // avatarUrl="https://github.com/shadcn.png"
                yearOfJoined={0}
              />
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
});
