import { z } from "zod";
import { Brand } from "./Brand";
import { UserId, zUserMinimalData } from "./User";
export type ConversationId = Brand<"string", "ConversationId">;

export const ConversationId = z
  .string()
  .transform((data) => data as ConversationId);
export const zMessage = z.object({
  _id: z.string(),
  userId: UserId,
  message: z.string(),
  date: z.string().transform((value) => new Date(value)),
  conversationId: z.string().optional(),
  messageHidden: z.array(UserId).min(0).nullable()
});

export type ztMessage = z.infer<typeof zMessage>;

export const zConversation = z.object({
  _id: ConversationId,
  userIds: z.array(zUserMinimalData),
  messages: z.array(zMessage),
  notificationForWho: UserId.optional(),
});

export type ztConversation = z.infer<typeof zConversation>;

export const zSendMessage = z.object({
  userId: UserId,
  message: z.string(),
  conversationId: ConversationId,
  receiverId: UserId,
});

export type ztSendMessage = z.infer<typeof zSendMessage>;
