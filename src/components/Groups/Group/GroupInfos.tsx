import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import Image from "next/image";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
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
export const GroupInfos = (props: {}) => {
  return (
    <Card>
      <CardHeader className="">
        <ContextMenu>
          <ContextMenuTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="cursor-default w-full">
                  <Image
                    src={"/avatar.jpeg"}
                    width={100}
                    height={100}
                    alt="ShadCN"
                    className="mx-auto rounded-full"
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
            {/* <ContextMenuItem inset>Report</ContextMenuItem> */}
            <ContextMenuSub>
              <ContextMenuSubTrigger>Report</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem>A Fake account</ContextMenuItem>
                <ContextMenuItem>create posts that are harmful</ContextMenuItem>
                <ContextMenuItem>Annoying to me</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        </ContextMenu>
      </CardHeader>
      <CardContent className="">
        <CardTitle className="text-center">ShadCN</CardTitle>
        <CardDescription className="text-center">
          A Person with passion to build Poddy, the best social Media website
          ever!
        </CardDescription>
        <Separator className="my-5" />
        <ul>
          <li>21 Members</li>
          <li>8 Posts</li>
          <li>9 Events</li>
          <li>Public</li>
        </ul>
      </CardContent>
      <Separator className="my-5" />
      <CardFooter className="flex gap-1 flex-wrap justify-center">
        <Button>Join Group</Button>
        <Button>Block</Button>
        <Button className="md:w-full">Settings</Button>
      </CardFooter>
    </Card>
  );
};
