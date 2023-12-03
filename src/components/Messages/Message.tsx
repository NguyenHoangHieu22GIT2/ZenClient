import { DateConverter } from "@/utils/DateConverter";
import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { ConversationId, ztMessage } from "@/Types/Conversation";
import { useUserStore } from "@/lib/useUserStore";
type props = {
  message: ztMessage
  isYourMessage: boolean;
  conversationId: ConversationId
  onSetMessages: React.Dispatch<React.SetStateAction<ztMessage[]>>
};

export const Message = (props: props) => {
  const userId = useUserStore(state => state.user._id)
  console.log(props.message.message === "Yo" && props.message)
  const removeMessageMutation = useMutation({
    mutationKey: ["remove-message"],
    mutationFn: async (deleteForWho: "you" | "everyone") => {
      const result = await api.patch<ztMessage>("conversations/messages", { messageId: props.message._id, conversationId: props.conversationId, deleteForWho })
      const data = result.data
      props.onSetMessages(messages => {
        return messages.map(message => {
          if (message._id === data._id) {
            return data
          }
          return message
        })
      })
    }
  })
  const date = DateConverter(props.message.date, {
    hour: "2-digit",
    minute: "2-digit",
  })
  const hasRemoved = props.message.messageHidden!.includes(userId)
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        {props.isYourMessage ?

          <div className="text-right mr-4 relative ">
            <div>
              <div>
                <h1 className="inline-block mb-1 bg-green-400 rounded-full  px-5 py-2">
                  {hasRemoved ? "Message Removed" : props.message.message}
                </h1>
                <p className="text-muted-foreground">
                  {date}
                </p>
              </div>
            </div>
          </div>
          :
          <div className="text-left relative">
            <h1 className="inline-block mb-1 bg-blue-400 rounded-full  px-5 py-2">
              {hasRemoved ? "Message Removed" : props.message.message}
            </h1>
            <p className="text-muted-foreground">
              {date}
            </p>
          </div>
        }
      </ContextMenuTrigger>
      {
        !hasRemoved &&
        <ContextMenuContent>
          <ContextMenuItem onClick={() => removeMessageMutation.mutate("you")}>Remove for you</ContextMenuItem>
          {props.isYourMessage &&
            <ContextMenuItem onClick={() => removeMessageMutation.mutate("everyone")}>Remove for everyone</ContextMenuItem>
          }
        </ContextMenuContent>

      }
    </ContextMenu>
  );
};
