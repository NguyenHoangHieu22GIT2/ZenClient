import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Image from 'next/image';
import { CheckImageUrl } from '@/utils/CheckImageUrl';
import { ztGroupQueries } from '@/Types/Group';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/lib/useUserStore';

type props = {
  onSetOpenModalChangeImage: () => void
  group: ztGroupQueries
}

export const ContextMenuGroupAvatar = (props: props) => {
  const userId = useUserStore(state => state.user._id)
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() => props.onSetOpenModalChangeImage()}
              className="cursor-default w-full"
            >
              <Image
                src={CheckImageUrl(props.group.groupAvatar)}
                width={100}
                height={100}
                alt={props.group.groupName}
                className={cn("mx-auto rounded-full aspect-square ", props.group.userId === userId ? "cursor-pointer" : "")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Right click for more options</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Block</ContextMenuItem>
        <ContextMenuItem>Unfollow</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Report</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>A Fake account</ContextMenuItem>
            <ContextMenuItem>
              create posts that are harmful
            </ContextMenuItem>
            <ContextMenuItem>Annoying to me</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
}
