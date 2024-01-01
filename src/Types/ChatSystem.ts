import { z } from "zod";
import { UserId, zUserMinimalData } from "./User";
import { Brand } from "./Brand";
import { ConversationId } from "./Conversation";

export type ChatSystemIdType = Brand<"string", "ChatSystemId">;

const chatSystemId = z.string().transform((data) => data as ChatSystemIdType);
export const zChatSystem = z.object({
  _id: chatSystemId,
  userId: UserId,
  conversations: z.array(
    z.object({
      conversationId: ConversationId,
      userId: zUserMinimalData,
    })
  ),
  createdAt: z.string().transform((value) => new Date(value)),
});

export type ztChatSystem = z.infer<typeof zChatSystem>;
