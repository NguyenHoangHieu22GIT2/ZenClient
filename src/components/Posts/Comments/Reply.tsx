import { CommentId, ztReplyType } from "@/Types/Post";
import { UserAvatarLink } from "@/components/Header/UserAvatarLink";
import { AvatarHoverCard } from "@/components/ui/AvatarHoverCard";
import { Username } from "@/components/ui/Username";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";

type props = {
  comment: ztReplyType;
  onDeleteReply: (replyId: CommentId) => void;
};

export function Reply(props: props) {
  return (
    <div>
      <div className="border rounded-lg shadow-sm p-2 dark:bg-slate-800 bg-slate-50">
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
