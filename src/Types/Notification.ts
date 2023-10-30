import { z } from "zod";
import { zPost } from "./Post";
import { zUser, UserId } from "./User";

// export type Notification = {
//   _id: string;
//   userId: UserId;
//   notificationHeader: string;
//   notificationBody: string;
//   options: Partial<{
//     link: string;
//     userId: User;
//     postId: Post;
//     groupId: Record<any, any>;
//   }>;
// };

// TODO:Change UserId to user Zod
export const zNotificationOptions = z.object({
  link: z.string(),
  userId: z.string(),
  postId: z.string(),
  groupId: z.string(),
});

export const zNotification = z.object({
  _id: z.string(),
  userId: z.string(),
  notificationHeader: z.string(),
  notificationBody: z.string(),
  options: zNotificationOptions.partial(),
});

export type ztNotification = z.infer<typeof zNotification>;
