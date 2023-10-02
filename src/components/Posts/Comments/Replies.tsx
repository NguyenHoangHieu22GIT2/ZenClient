import { CommentId, CommentType, PostId, ReplyType } from "@/Types/Post";
import { Comment } from "./Comment";
import { Reply } from "./Reply";
import { Button } from "@/components/ui/button";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { useCallback, useState } from "react";
import { v4 } from "uuid";
import { useAuthStore } from "@/lib/storeZustand";
import { Bearer } from "@/utils/Bearer";

type props = {
  replies: ReplyType[];
  repliesCount: number;
  refetchReplies: () => void;
  onDeleteReply: (replyId: CommentId) => void;
};

export function Replies(props: props) {
  const [hasRefetched, setHasRefetched] = useState(false);
  const refetch = useCallback(() => {
    setHasRefetched(true);
    props.refetchReplies();
  }, [props.refetchReplies]);
  return (
    <div>
      {props.repliesCount > 3 && !hasRefetched && (
        <Button onClick={refetch} variant={"ghost"}>
          More...
        </Button>
      )}
      <ul>
        {props.replies.map((reply: ReplyType) => {
          return (
            <Reply
              onDeleteReply={props.onDeleteReply}
              comment={reply}
              key={reply._id.toString()}
            />
          );
        })}
      </ul>
    </div>
  );
}
