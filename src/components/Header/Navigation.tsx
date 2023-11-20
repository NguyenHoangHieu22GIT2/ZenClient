"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { useChatSystemStore } from "@/lib/useChatSystemStore";
import { cn } from "@/lib/utils";
export function HeaderNavigation() {
  const pathname = usePathname();
  const isNotified = useChatSystemStore((state) => state.isNotified);
  return (
    <ul className="flex gap-5">
      <li className="text-3xl">
        <Link href="/">{pathname === "/" ? <GoHomeFill /> : <GoHome />}</Link>
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
      <li
        className={cn(
          "text-3xl relative",
          isNotified
            ? "after:text-white after:w-5 after:h-5 after:absolute after:bg-red-500 after:-top-1 after:-right-1 after:rounded-full"
            : ""
        )}
      >
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
  );
}
