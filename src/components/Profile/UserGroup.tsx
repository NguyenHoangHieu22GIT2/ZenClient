import React from "react";
import Image from "next/image";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Link from "next/link";
import { ztGroupMinimal } from "@/Types/Group";
import { CheckImageUrl } from "@/utils/CheckImageUrl";

type props = {
  group: ztGroupMinimal;
};

export const UserGroup = ({ group }: props) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link href={`/groups/${group._id}`}>
          <div className="flex gap-3">
            <div>
              <Image
                src={CheckImageUrl(group.groupAvatar)}
                alt={group.groupName}
                width={75}
                height={75}
                className="aspect-square rounded-full"
              />
            </div>
            <div>
              <h1 className="font-bold">{group.groupName}</h1>
              <p className="w-64 whitespace-nowrap overflow-hidden text-ellipsis">
                {group.groupDescription}
              </p>
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
