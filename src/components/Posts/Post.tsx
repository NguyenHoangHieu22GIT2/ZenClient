"use client";
import React, { useCallback, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Eye, MessageSquare, Share2, ThumbsUp } from "lucide-react";
import { PostComment } from "./Comments/PostComment";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { ztCommentType, PostId } from "@/Types/Post";
import { Paragraph } from "../ui/Paragraph";
import { Heading } from "../ui/Heading";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { ztPost } from "@/Types/Post";
import { DateConverter } from "@/utils/DateConverter";
import { v4 } from "uuid";
import { Comment } from "./Comments/Comment";
import { ReportPostDialog } from "./UI/ReportPostDialog";
import { DropDownMenuPost } from "./UI/DropDownMenuPost";
import Modal from "../uiOwnCreation/Modal";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { UserAvatarLink } from "../Header/UserAvatarLink";
import { useToggleLike } from "@/apis/Post/useCreateLike";
import { UserId } from "@/Types/User";
type props = {
  post: ztPost;
  setPosts: React.Dispatch<React.SetStateAction<ztPost[]>>
};

export const Post = React.memo((props: props) => {
  const [readMore, setReadMore] = useState(props.post.postBody.length < 500);
  let postBody = props.post.postBody.slice(0, 500);
  if (readMore) {
    postBody = props.post.postBody;
  }
  const changeToReadMore = useCallback(() => {
    setReadMore(true);
  }, []);
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(
    props.post.isLiked ? props.post.isLiked : false
  );
  const [openImage, setOpenImage] = useState(-1);
  const [reportDialog, setReportDialog] = useState(false);
  const [likes, setLikes] = useState(props.post.likes);
  const [loadMoreComments, setLoadMoreComments] = useState("");
  const [comments, setComments] = useState<ztCommentType[]>(
    props.post.comments
  );
  const [isOpenComments, setIsOpenComments] = useState(
    props.post.comments.length > 0
  );
  const toggleLikeMutation = useToggleLike();
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

  const mutateLike = useCallback(() => {
    toggleLikeMutation.mutate({
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
  }, [props.post._id, setIsLiked]);
  const toggleLike = useCallback(() => {
    const date = DateConverter();
    const toastInfo = {
      title: "",
      actionAltText: "",
    };
    if (toggleLikeMutation.error) {
      toastInfo.title = "Something went wrong";
      toastInfo.actionAltText = "LOL";
    }
    mutateLike();
    if (!isLiked) {
      toastInfo.title = "Liked a Post";
      toastInfo.actionAltText = "Undo Like";
    } else if (isLiked) {
      toastInfo.title = "UnLiked a Post";
      toastInfo.actionAltText = "Undo Unlike";
    }
    toast({
      title: toastInfo.title,
      action: (
        <ToastAction onClick={mutateLike} altText={toastInfo.actionAltText}>
          Undo
        </ToastAction>
      ),
      description: date,
    });
  }, [props.post._id, isLiked]);
  const dateOfPublished = DateConverter(new Date(props.post.createdAt));

  const ImagesContainer: string[] = props.post.images
    ? props.post.images.slice(0, 2)
    : [];

  const toggleReportDialog = useCallback(
    () => setReportDialog((oldBool) => !oldBool),
    [reportDialog]
  );

  const deletePost = useCallback(async (postId: PostId) => {
    const result = await api.delete<ztPost>(`posts/${postId}`)
    if (result.data._id) {
      props.setPosts((posts) => {
        return posts.filter(post => post._id !== postId)
      })
    }
  }, [props.post])


  if (commentsIsError) {
    return <h1>Something went wrong</h1>;
  }
  const changeImageIndex = (direction: "LEFT" | "RIGHT") => {
    if (direction === "LEFT") {
      openImage === 0
        ? setOpenImage(props.post.images.length - 1)
        : setOpenImage((oldIndex) => oldIndex - 1);
    } else if (direction === "RIGHT") {
      openImage === props.post.images.length - 1
        ? setOpenImage(0)
        : setOpenImage((oldIndex) => oldIndex + 1);
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
            {ImagesContainer.length > 1 && (
              <Button onClick={changeImageIndex.bind(this, "LEFT")}>
                <AiFillCaretLeft />
              </Button>
            )}
            <div className="w-screen h-screen">
              <Image
                className="w-full h-full"
                src={
                  process.env.NEXT_PUBLIC_SERVER_URL_UPLOADS +
                  props.post.images[openImage]
                }
                alt={props.post.postHeading}
                width={1000}
                height={1000}
              />
            </div>
            {ImagesContainer.length > 1 && (
              <Button onClick={changeImageIndex.bind(this, "RIGHT")}>
                <AiFillCaretRight />
              </Button>
            )}
          </div>
        </Modal>
      )}
      <Card className="m-2 sm:mx-auto bg-slate-50 w-full max-w-[800px]">
        <CardHeader className="flex flex-row justify-between px-6 py-3">
          <div className=" flex items-center gap-2">
            <UserAvatarLink user={props.post.user} />
            <div>
              <Label className="text-sm">{props.post.user.username}</Label>
              <p className="text-gray-500 text-[10px]">{dateOfPublished}</p>
            </div>
          </div>
          <div>
            <DropDownMenuPost userPostId={props.post.userId} onDeletePost={deletePost} postId={props.post._id} toggleReportDialog={toggleReportDialog} />
            <ReportPostDialog
              userId={props.post.userId as UserId}
              toggleReportDialog={toggleReportDialog}
              reportDialogOpen={reportDialog}
              postId={props.post._id}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="my-2" />
          <Heading>{props.post.postHeading}</Heading>
          <Paragraph>{postBody}</Paragraph>
          {!readMore && (
            <Button onClick={changeToReadMore} variant={"outline"}>
              Read more...
            </Button>
          )}
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
          {
            props.post.files.length > 0 &&
            <div className="mt-5 border-black border-2 p-5">
              <h1 className="font-bold text-xl mb-5">File to download:</h1>
              {props.post.files.map((file, index) => {
                return <a key={index} className="border-2 border-gray-200 p-2 rounded-lg" href={`http://localhost:3001/uploads/${file}`}>{file}</a>
              })}
            </div>
          }
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
              disabled={toggleLikeMutation.isLoading ? true : false}
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
});
