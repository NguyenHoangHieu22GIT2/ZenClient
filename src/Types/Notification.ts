import { z } from "zod";
import { UserIdTransformer, zUserMinimalData } from "./User";
import { Brand } from "./Brand";

export type NotificationId = Brand<string, "NotificationId">;

export const NotificationIdTransformer = z
  .string()
  .transform((data) => data as NotificationId);

// TODO:Change UserId to user Zod
export const zNotificationOptions = z.object({
  link: z.string(),
  userId: zUserMinimalData,
  postId: z.string(),
  groupId: z.string(),
});

export const zNotification = z.object({
  _id: NotificationIdTransformer,
  userId: z.string(),
  options: zNotificationOptions.partial(),
  createdAt: z.string(),
  updatedAt: z.string(),
  hasSeen: z.boolean(),
  notificationType: z.union([
    z.literal("accept-friend"),
    z.literal("friend-request"),
    z.literal("general"),
  ]),
});

export const zNotifications = z.array(zNotification);

export const zFriendRequest = z.object({
  userId: UserIdTransformer,
  notificationId: NotificationIdTransformer,
});

export type ztFriendRequest = z.infer<typeof zFriendRequest>;

export type ztNotifications = z.infer<typeof zNotifications>;

export type ztNotification = z.infer<typeof zNotification>;
