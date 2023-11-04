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
import { CommentId, ztCommentType, PostId } from "@/Types/Post";
import { Paragraph } from "../ui/Paragraph";
import { Heading } from "../ui/Heading";
import { Comments } from "./Comments/Comments";

import { AvatarHoverCard } from "../ui/AvatarHoverCard";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";
import { ztPost } from "@/Types/Post";

import { DateConverter } from "@/utils/DateConverter";
import { v4 } from "uuid";
import { Comment } from "./Comments/Comment";
import { ReportPostDialog } from "./UI/ReportPostDialog";
import { DropDownMenuPost } from "./UI/DropDownMenuPost";
import Modal from "../uiOwnCreation/Modal";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
type props = {
  post: ztPost;
};

export const Post = (props: props) => {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(
    props.post.isLiked ? props.post.isLiked : false
  );

  const [openImage, setOpenImage] = useState(-1);
  const [reportDialog, setReportDialog] = useState(false);
  const [likes, setLikes] = useState(props.post.likes.length);
  const [loadMoreComments, setLoadMoreComments] = useState("");
  const [comments, setComments] = useState<ztCommentType[]>(
    props.post.comments
  );

  const {
    mutate: likeMutation,
    isLoading: likeIsLoading,
    error: likeIsError,
  } = useMutation({
    mutationKey: ["post/like"],
    mutationFn: async (data: { postId: string }) => {
      return api
        .patch(process.env.NEXT_PUBLIC_SERVER_TOGGLE_LIKE_POST, data, {
          withCredentials: true,
        })
        .then((data) => data);
    },
  });
  const { error: commentsIsError, refetch: commentsRefetch } = useQuery({
    queryKey: ["post/comments", loadMoreComments],
    queryFn: async () => {
      return api
        .get(`posts/get-comments?postId=${props.post._id}`, {
          withCredentials: true,
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
    (comment: ztCommentType) => {
      setComments((oldComments) => [comment, ...oldComments]);
    },
    [setComments]
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

  const ImagesContainer: string[] = [];

  for (
    let imageIndex = 0;
    imageIndex < props.post.images.length;
    imageIndex++
  ) {
    if (imageIndex >= 2) break;
    const image = props.post.images[imageIndex];
    ImagesContainer.push(image);
  }

  const toggleReportDialog = useCallback(
    () => setReportDialog((oldBool) => !oldBool),
    [reportDialog]
  );

  const changeImageIndex = (direction: "LEFT" | "RIGHT") => {
    if (direction === "LEFT") {
      if (openImage === 0) setOpenImage(props.post.images.length - 1);
      else setOpenImage((oldIndex) => oldIndex - 1);
    } else if (direction === "RIGHT") {
      if (openImage === props.post.images.length - 1) setOpenImage(0);
      else setOpenImage((oldIndex) => oldIndex + 1);
    }
  };
  return (
    <>
      {openImage !== -1 && (
        <Modal
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-3/4 aspect-video"
          onClose={() => {
            setOpenImage(-1);
          }}
        >
          <div className="flex gap-3 w-full justify-center aspect-square items-center">
            <Button onClick={changeImageIndex.bind(this, "LEFT")}>
              <AiFillCaretLeft />
            </Button>
            <Image
              className="w-3/4  aspect-video"
              src={
                process.env.NEXT_PUBLIC_SERVER_URL_UPLOADS +
                props.post.images[openImage]
              }
              alt={props.post.postHeading}
              width={1920}
              height={1080}
            />
            <Button onClick={changeImageIndex.bind(this, "RIGHT")}>
              <AiFillCaretRight />
            </Button>
          </div>
        </Modal>
      )}
      <Card className="m-2 sm:mx-auto bg-slate-50 w-full max-w-[800px]">
        <CardHeader className="flex flex-row justify-between px-6 py-3">
          <div className=" flex items-center gap-2">
            <AvatarHoverCard
              username={props.post.user.username}
              avatarUrl={props.post.user.avatar || "/default-user.jpeg"}
              yearOfJoined={4}
            />
            <div>
              <Label className="text-sm">{props.post.user.username}</Label>
              <p className="text-gray-500 text-[10px]">{dateOfPublished}</p>
            </div>
          </div>
          <div>
            {/* <Badge className="mr-3">{props.post.user.badge}</Badge> */}
            <DropDownMenuPost toggleReportDialog={toggleReportDialog} />
            <ReportPostDialog
              toggleReportDialog={toggleReportDialog}
              reportDialogOpen={reportDialog}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="my-2" />
          <Heading>{props.post.postHeading}</Heading>
          <Paragraph>{props.post.postBody}</Paragraph>
          <div className="flex [&>*]:flex-1 gap-1 ">
            {ImagesContainer.map((image, index) => (
              <button
                key={index}
                className={
                  "w-full " +
                  (index === 1
                    ? "after:content-['+'] after:w-[100%] after:h-[100%] after:absolute relative after:bg-black/20 after:top-0 after:left-0 after:flex after:justify-center after:items-center after:text-4xl "
                    : "")
                }
                onClick={() => {
                  setOpenImage(index);
                }}
              >
                <Image
                  loading="lazy"
                  className="w-full h-full"
                  src={process.env.NEXT_PUBLIC_SERVER_URL_UPLOADS + image}
                  alt={props.post.postHeading}
                  width={1920}
                  height={1080}
                />
              </button>
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
                <PostComment
                  postId={props.post._id}
                  onAddComment={postComment}
                />
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
    </>
  );
};
