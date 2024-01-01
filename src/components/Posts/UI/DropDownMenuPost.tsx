import { PostId } from "@/Types/Post";
import { UserId } from "@/Types/User";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/lib/useUserStore";
import { BsThreeDotsVertical } from "react-icons/bs";
type props = {
  toggleReportDialog: () => void;
  onDeletePost: (postId: PostId) => void
  postId: PostId,
  userPostId: UserId
};
export function DropDownMenuPost(props: props) {
  const userId = useUserStore(state => state.user._id)
  return (
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
          <DropdownMenuItem className="[&>*]:w-full">
            <button onClick={props.toggleReportDialog} className="text-left">
              Report
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Hide</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Share</span>
          </DropdownMenuItem>
          {props.userPostId === userId &&
            <DropdownMenuItem onClick={props.onDeletePost.bind(null, props.postId)}>
              <span>Delete</span>
            </DropdownMenuItem>
          }
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
