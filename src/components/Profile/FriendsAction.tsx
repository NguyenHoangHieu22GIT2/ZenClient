import { UserId, zUserId, ztUserId, ztUserMinimalData } from "@/Types/User";
import { api } from "@/lib/axios.api";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

type props = {
  userId: UserId;
  onSetUser: React.Dispatch<React.SetStateAction<ztUserMinimalData[]>>;
};
export const FriendsAction = (props: props) => {
  const { data, error, isLoading, mutate } = useMutation({
    mutationKey: ["Unfriend"],
    mutationFn: async (data: UserId) => {
      return api
        .patch<ztUserId>(
          "friends/unfriend",
          { userId: data },
          { withCredentials: true }
        )
        .then((result) => {
          const parsedResult = zUserId.parse(result.data);
          props.onSetUser((oldUsers) => {
            return oldUsers.filter((user) => user._id !== props.userId);
          });
          return parsedResult;
        });
    },
  });

  const unfriendMutation = useCallback(() => {
    mutate(props.userId);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full">Settings</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Button
              onClick={unfriendMutation}
              className="w-full inline"
              variant={"secondary"}
            >
              Unfriend
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
