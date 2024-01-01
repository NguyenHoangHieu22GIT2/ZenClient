import { Button } from "@/components/ui/button";
import { Username } from "@/components/ui/Username";
import {
  CommentId,
  ztCommentType,
  PostId,
  ztReplyType,
  zCommentType,
  zReplyType,
} from "@/Types/Post";
import React, { useCallback, useState } from "react";
import { BiDownArrowAlt } from "react-icons/bi";
import { PostComment } from "./PostComment";
import { Replies } from "./Replies";
import { api } from "@/lib/axios.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { v4 } from "uuid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { UserAvatarLink } from "@/components/Header/UserAvatarLink";
import { useUserStore } from "@/lib/useUserStore";

type props = {
  postId: PostId;
  comment: ztCommentType;
  changeComments: React.Dispatch<React.SetStateAction<ztCommentType[]>>;
};
export const Comment = (props: props) => {
  const userId = useUserStore(state => state.user._id)
  const [replies, setReplies] = useState(props.comment.replies || []);

  const {
    mutate: deleteCommentMutation,
    isLoading: deleteCommentIsLoading,
    error: deleteCommentError,
  } = useMutation({
    mutationKey: ["post/comment/delete"],
    mutationFn: async ({
      postId,
      commentId,
      replyId,
    }: {
      postId: PostId;
      commentId: CommentId;
      replyId?: CommentId;
    }) => {
      // Make it easier to write the endpoint
      const endpoint = replyId ? "reply" : 'comment'
      const result = await api
        .delete(
          `/posts/delete-${endpoint}?postId=${postId}&commentId=${commentId}${replyId ? `&replyId=${replyId}` : ""
          }`
        )
      const parsedData = zCommentType.parse(result.data);
      if (replyId) {
        setReplies((oldReplies) => {
          return oldReplies.filter((reply) => {
            return reply._id !== parsedData._id;
          });
        });
      } else {
        props.changeComments((oldComments) => {
          return oldComments.filter(
            (comment) => comment._id !== parsedData._id
          );
        });
      }
      return parsedData;
    },
  });
  const deleteCommentHandler = useCallback(
    (replyId?: CommentId) => {
      deleteCommentMutation({
        postId: props.postId,
        commentId: props.comment._id,
        replyId,
      });
    },
    [deleteCommentMutation, props.postId, props.comment._id]
  );

  const [openPostComment, setOpenPostComment] = useState(false);
  const createReply = useCallback((reply: ztReplyType) => {
    const parsedReply = zReplyType.parse(reply);
    setReplies((oldArray) => [...oldArray, parsedReply]);
  }, []);
  const [loadMoreReplies, setLoadMoreReplies] = useState("");
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["post/comments/replies", loadMoreReplies],
    queryFn: async () => {
      return api
        .get(
          `posts/get-replies?postId=${props.postId}&commentId=${props.comment._id}`,
          {
            withCredentials: true,
          }
        )
        .then((data) => {
          setReplies(data.data);
          return data;
        });
    },
    enabled: !!loadMoreReplies,
  });
  function getMoreReplies() {
    refetch();
    const random = v4();
    setLoadMoreReplies(random);
  }

  return (
    <div>
      <div className="border rounded-lg shadow-sm p-2 dark:bg-slate-800 bg-slate-100">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center ">
            <UserAvatarLink user={props.comment.user} />
            <Username>{props.comment.user.username}</Username>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BsThreeDotsVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit</DropdownMenuItem>
                {props.comment.user._id === userId &&
                  <DropdownMenuItem onClick={() => deleteCommentHandler()}>
                    Delete
                  </DropdownMenuItem>
                }

                <DropdownMenuItem>See old Edits</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="font-normal leading-7">{props.comment.comment}</p>
        <div className="text-right">
          <Button
            onClick={() => setOpenPostComment((oldBool) => !oldBool)}
            variant={"outline"}
            className="px-2 py-1 "
          >
            <BiDownArrowAlt />
            Replies
          </Button>
        </div>
        <div className="my-2">
          {openPostComment && (
            <>
              <PostComment
                onAddComment={createReply}
                postId={props.postId}
                commentId={props.comment._id}
              />
            </>
          )}
        </div>
        <Replies
          onDeleteReply={deleteCommentHandler}
          refetchReplies={getMoreReplies}
          repliesCount={props.comment.repliesCount}
          replies={replies}
        />
      </div>
    </div>
  );
};
