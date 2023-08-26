import React from "react";
import Image from "next/image";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/app/_components/ui/context-menu";
import Link from "next/link";
export const Group = (props: {}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link href={"/group/1"}>
          <div className="flex gap-3">
            <div>
              <Image
                src="https://images.unsplash.com/photo-1692610492938-37a4eed63ac0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
                alt="The group image"
                width={75}
                height={75}
                className="aspect-square rounded-full"
              />
            </div>
            <div>
              <h1 className="font-bold">Cat Land</h1>
              <p>A group for people who loves cat</p>
            </div>
          </div>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Join Group</ContextMenuItem>
        <ContextMenuItem>Stop people from adding</ContextMenuItem>
        <ContextMenuItem>Report</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
