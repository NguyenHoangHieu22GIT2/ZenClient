import { CommentId, ztCommentType, PostId, ztReplyType } from "@/Types/Post";
import { Reply } from "./Reply";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";

type props = {
  replies: ztReplyType[];
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
        {props.replies.map((reply: ztReplyType) => {
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
