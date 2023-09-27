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
export function HeaderNavigation() {
  const pathname = usePathname();

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
  );
}
