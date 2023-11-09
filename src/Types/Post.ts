import { z } from "zod";
import { Brand } from "./Brand";

import { GroupId } from "./Group";

import { zUser, UserId, zUserMinimalData } from "./User";

const PostIdTransformed = z.string().transform((data) => data as PostId);
const CommentIdTransformed = z.string().transform((data) => data as CommentId);

export type Mode = "global" | "private" | "normal";

export type PostId = Brand<string, "PostId">;

export type CommentId = Brand<string, "CommentId">;

export const zReplyType = z.object({
  comment: z.string(),
  userId: z.string(),
  user: zUser.pick({ avatar: true, username: true }),
  _id: CommentIdTransformed,
});

export type ztReplyType = z.infer<typeof zReplyType>;

export const zCommentType = z.object({
  comment: z.string(),
  userId: z.string(),
  user: zUser.pick({ avatar: true, username: true }),
  _id: CommentIdTransformed,
  replies: z.array(zReplyType),
  repliesCount: z.number(),
});

export type ztCommentType = z.infer<typeof zCommentType>;

// export type ReplyType = {
//   comment: string;
//   userId: UserId;
//   user: Pick<UserZod, "avatar" | "username">;
//   _id: CommentId;
// };

// export type CommentType = {
//   comment: string;
//   userId: UserId;
//   user: Pick<User, "avatar" | "username">;
//   _id: CommentId;
//   replies: ReplyType[];
//   repliesCount: number;
// };

export type ztPost = z.infer<typeof zPost>;

export const zPost = z.object({
  _id: PostIdTransformed,
  postHeading: z.string(),
  postBody: z.string(),
  userId: z.string(),
  files: z.array(z.string()),
  images: z.array(z.string()),
  likes: z.array(z.string()),
  views: z.number(),
  comments: z.array(zCommentType),
  mode: z.union([
    z.literal("private"),
    z.literal("normal"),
    z.literal("global"),
  ]),
  user: zUserMinimalData,
  createdAt: z.string().transform((str) => new Date(str)),
  isLiked: z.boolean(),
  commentsCount: z.number(),
});

export const zPostCreate = z.object({
  postHeading: z.string().trim().min(1),
  postBody: z.string().trim().min(1),
  files: typeof window === "undefined" ? z.null() : z.array(z.instanceof(File)),
  groupId: z.string().nullable(),
});

export type ztPostCreate = z.infer<typeof zPostCreate>;

export const zResultsOfPostsInfiniteQuery = z.object({
  posts: z.array(zPost),
  postsCount: z.number(),
});

export type ztResultsOfPostsInfiniteQuery = z.infer<
  typeof zResultsOfPostsInfiniteQuery
>;

// export type Post = {
//   _id: PostId;
//   postHeading: z.string();
//   postBody: string;
//   userId: UserId;
//   files: string[];
//   likes: UserId[];
//   views: number;
//   comments: CommentType[];
//   mode: Mode;
//   user: User;
//   createdAt: string;
//   isLiked?: boolean;
//   commentsCount: number;
// };

// export type PostGroup = {
//   _id: PostId;
//   postHeading: string;
//   postBody: string;
//   userId: UserId;
//   images: string[];
//   likes: UserId[];
//   views: number;
//   comments: CommentType[];
//   mode: Mode;
//   GroupId: GroupId;
//   user: User;
//   createdAt: Date;
//   isLiked?: boolean;
// };
