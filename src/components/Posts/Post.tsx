"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Eye, MessageSquare, Share2, ThumbsUp } from "lucide-react";
import { PostComment } from "./Comments/PostComment";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { CommentType } from "./Comments/Comment";
import { Paragraph } from "../ui/Paragraph";
import { Heading } from "../ui/Heading";
import { Comments } from "./Comments/Comments";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AvatarHoverCard } from "../ui/AvatarHoverCard";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
type props = {
  avatarUrl: string;
  username: string;
  dateOfPublished: Date;
  heading: string;
  paragraph: string;
  numOfViews: number;
  badge: string;
  isLiked: boolean;
  images: string[];
};

export const Post = (props: props) => {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([
    {
      _id: "1",
      avatarUrl: "https://github.com/shadcn.png",
      paragraph: "This is just a testing Comment",
      username: "Shadcn",
    },
  ]);
  const postComment = useCallback(
    (comment: CommentType) => {
      setComments((oldComments) => [comment, ...oldComments]);
    },
    [setComments]
  );
  useEffect(() => {
    if (props.isLiked) setIsLiked(true);
  }, [props.isLiked]);
  // const date = new Date(props.dateOfPublished);
  const [isOpenComments, setIsOpenComments] = useState(false);
  let commentsElement = <></>;
  if (isOpenComments) {
    commentsElement = (
      <div className="flex flex-col gap-5">
        <PostComment onAddComment={postComment} />
        <Comments comments={comments} />
      </div>
    );
  }
  return (
    <Card className="m-2 sm:mx-auto w-full max-w-[800px]">
      <CardHeader className="flex flex-row justify-between px-6 py-3">
        <div className=" flex items-center gap-2">
          <AvatarHoverCard
            username={props.username}
            avatarUrl={props.avatarUrl}
            yearOfJoined={4}
          />
          <div>
            <Label className="text-sm">{props.username}</Label>
            <p className="text-gray-500 text-[10px]">8AM yesterday</p>
          </div>
        </div>
        <div>
          <Badge className="mr-3">{props.badge}</Badge>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"secondary"}>
                  <BsThreeDotsVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <AlertDialogTrigger asChild>
                      <span>Report</span>
                      {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                    </AlertDialogTrigger>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Hide</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Share</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                Give us reasons why you reported this post.
              </AlertDialogHeader>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <Checkbox />
                  <Label>This post contains violences</Label>
                </li>
                <li className="flex items-center gap-2">
                  <Checkbox />
                  <Label>This post contains content that is NSFW</Label>
                </li>
                <li className="flex items-center gap-2">
                  <Checkbox />
                  <Label>This post spread false information</Label>
                </li>
              </ul>
              <AlertDialogFooter>
                <AlertDialogTrigger>
                  <Button variant={"destructive"}>Submit</Button>
                </AlertDialogTrigger>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        <Separator className="my-2" />
        <Heading>{props.heading}</Heading>
        <Paragraph>{props.paragraph}</Paragraph>
        <div className="flex flex-wrap gap-2 justify-center">
          {props.images.map((image) => (
            <Image
              src={process.env.NEXT_PUBLIC_SERVER_URL_UPLOADS + image}
              alt={props.heading}
              width={500}
              height={500}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="block ">
        <div className="flex gap-2 mb-3">
          <Eye />
          {props.numOfViews} views
        </div>
        <div className="flex items-center gap-3">
          <Button
            className={`${isLiked && "text-blue-700 hover:text-blue-700"} `}
            variant={"ghost"}
            onClick={() => {
              if (!isLiked)
                toast({
                  title: "Liked a Post",
                  description: "Friday, February 10, 2023 at 5:57 PM",
                  action: <ToastAction altText="LOL">Undo</ToastAction>,
                });
              else
                toast({
                  title: "Unliked a Post",
                  description: "Friday, February 10, 2023 at 5:57 PM",
                  action: <ToastAction altText="LOL">Undo</ToastAction>,
                });
              setIsLiked((oldBool) => !oldBool);
            }}
          >
            <ThumbsUp className="w-4 h-4 mr-2"></ThumbsUp>
            Like
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => {
              setIsOpenComments((oldBool) => !oldBool);
            }}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Comment
          </Button>
          <Button variant={"ghost"}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
        <Separator />
        <div className="mt-5">{commentsElement}</div>
      </CardFooter>
    </Card>
  );
};
