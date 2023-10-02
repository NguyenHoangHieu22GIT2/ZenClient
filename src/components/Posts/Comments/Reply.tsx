import { CommentId, CommentType, PostId, ReplyType } from "@/Types/Post";
import { AvatarHoverCard } from "@/components/ui/AvatarHoverCard";
import { Username } from "@/components/ui/Username";
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
import { api } from "@/lib/axios.api";
import { useMutation } from "@tanstack/react-query";
import { BsThreeDotsVertical } from "react-icons/bs";

type props = {
  comment: ReplyType;
  onDeleteReply: (replyId: CommentId) => void;
};

export function Reply(props: props) {
  return (
    <div>
      <div className="border rounded-lg shadow-sm p-2 dark:bg-slate-800 bg-slate-50">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center ">
            <AvatarHoverCard
              username={props.comment.user.username}
              avatarUrl={props.comment.user.avatar || "./default-user.jpeg"}
              yearOfJoined={4}
            />
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
                <DropdownMenuItem
                  onClick={() => props.onDeleteReply(props.comment._id)}
                >
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem>See old Edits</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="font-normal leading-7">{props.comment.comment}</p>
      </div>
    </div>
  );
}
