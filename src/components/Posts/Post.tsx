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
import { CommentId, CommentType, PostId } from "@/Types/Post";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";
import { useAuthStore } from "@/lib/storeZustand";
import { Post as PostType } from "@/Types/Post";

import { DateConverter } from "@/utils/DateConverter";
import { v4 } from "uuid";
import { Comment } from "./Comments/Comment";
type props = {
  post: PostType;
};

export const Post = (props: props) => {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(
    props.post.isLiked ? props.post.isLiked : false,
  );
  const [likes, setLikes] = useState(props.post.likes.length);
  const [loadMoreComments, setLoadMoreComments] = useState("");
  const [comments, setComments] = useState<CommentType[]>(props.post.comments);

  const access_token = useAuthStore((state) => state.access_token);

  const {
    mutate: likeMutation,
    isLoading: likeIsLoading,
    error: likeIsError,
  } = useMutation({
    mutationKey: ["post/like"],
    mutationFn: async (data: { postId: string }) => {
      console.log(data);
      return api
        .patch(process.env.NEXT_PUBLIC_SERVER_TOGGLE_LIKE_POST, data, {
          headers: {
            authorization: Bearer(access_token),
          },
        })
        .then((data) => data);
    },
  });
  const {
    data: commentsData,
    isLoading: commentsIsLoading,
    error: commentsIsError,
    refetch: commentsRefetch,
  } = useQuery({
    queryKey: ["post/comments", loadMoreComments],
    queryFn: async () => {
      return api
        .get(`posts/get-comments?postId=${props.post._id}`, {
          headers: { authorization: Bearer(access_token) },
        })
        .then((data) => {
          setComments(data.data);
          return data;
        });
    },
    enabled: !!loadMoreComments,
  });
  if (commentsIsError) {
    return <h1>Something went wrong</h1>;
  }
  const refetchComments = useCallback(() => {
    commentsRefetch();
    setLoadMoreComments(v4());
  }, [loadMoreComments]);
  const postComment = useCallback(
    (comment: CommentType) => {
      setComments((oldComments) => [comment, ...oldComments]);
    },
    [setComments],
  );
  useEffect(() => {
    if (props.post.isLiked) setIsLiked(true);
  }, [props.post.isLiked]);
  const [isOpenComments, setIsOpenComments] = useState(false);

  const mutateLike = useCallback(() => {
    likeMutation({
      postId: props.post._id,
    });
    setIsLiked((oldBool) => {
      const newBool = !oldBool;
      if (newBool === true) {
        setLikes((likes) => likes + 1);
      } else {
        setLikes((likes) => likes - 1);
      }
      return newBool;
    });
  }, [props.post._id, isLiked]);
  const toggleLike = useCallback(() => {
    const date = DateConverter();
    if (likeIsError) {
      toast({
        title: "Something went wrong",
        description: date,
        action: <ToastAction altText="LOL">Undo</ToastAction>,
      });
    }

    mutateLike();
    if (!isLiked)
      toast({
        title: "Liked a Post",
        description: date,
        action: (
          <ToastAction onClick={mutateLike} altText="Undo Like">
            Undo
          </ToastAction>
        ),
      });
    else
      toast({
        title: "Unliked a Post",
        description: date,
        action: (
          <ToastAction onClick={mutateLike} altText="Undo Unlike">
            Undo
          </ToastAction>
        ),
      });
  }, [props.post._id]);
  const dateOfPublished = DateConverter(new Date(props.post.createdAt));
  return (
    <Card className="m-2 sm:mx-auto bg-slate-50 w-full max-w-[800px]">
      <CardHeader className="flex flex-row justify-between px-6 py-3">
        <div className=" flex items-center gap-2">
          <AvatarHoverCard
            username={props.post.user.username}
            avatarUrl={props.post.user.avatar || "./default-user.jpeg"}
            yearOfJoined={4}
          />
          <div>
            <Label className="text-sm">{props.post.user.username}</Label>
            <p className="text-gray-500 text-[10px]">{dateOfPublished}</p>
          </div>
        </div>
        <div>
          <Badge className="mr-3">{props.post.user.badge}</Badge>
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
        <Heading>{props.post.postHeading}</Heading>
        <Paragraph>{props.post.postBody}</Paragraph>
        <div className="flex flex-wrap gap-2 justify-center">
          {props.post.images.map((image, index) => (
            <Image
              key={index}
              src={process.env.NEXT_PUBLIC_SERVER_URL_UPLOADS + image}
              alt={props.post.postHeading}
              width={500}
              height={500}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="block ">
        <div className="flex gap-2 mb-3">
          <Eye />
          {props.post.views} views
        </div>
        <div className="flex items-center gap-3">
          <Button
            className={`${isLiked && "text-blue-700 hover:text-blue-700"} `}
            variant={"ghost"}
            onClick={toggleLike}
            disabled={likeIsLoading ? true : false}
          >
            <ThumbsUp className="w-4 h-4 mr-2"></ThumbsUp>
            {likes} Like
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
        <div className="mt-5">
          {isOpenComments && (
            <div className="flex flex-col gap-5">
              <PostComment postId={props.post._id} onAddComment={postComment} />
              {comments.map((comment) => (
                <Comment
                  changeComments={setComments}
                  postId={props.post._id}
                  comment={comment}
                  key={comment._id}
                />
              ))}
            </div>
          )}
          {props.post.commentsCount > 3 &&
            isOpenComments &&
            !loadMoreComments && (
              <Button onClick={refetchComments} variant={"ghost"}>
                More...
              </Button>
            )}
        </div>
      </CardFooter>
    </Card>
  );
};
