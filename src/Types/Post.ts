import { z } from "zod";
import { Brand } from "./Brand";

import { UserId, zUser, zUserMinimalData } from "./User";

const PostIdTransformed = z.string().transform((data) => data as PostId);
const CommentIdTransformed = z.string().transform((data) => data as CommentId);

export type Mode = "global" | "private" | "normal";

export type PostId = Brand<string, "PostId">;

export type CommentId = Brand<string, "CommentId">;

export const zReplyType = z.object({
  comment: z.string(),
  user: zUserMinimalData.omit({ email: true }),
  _id: CommentIdTransformed,
});

export type ztReplyType = z.infer<typeof zReplyType>;

export const zUserMinimalDataOmitEmail = zUserMinimalData.omit({
  email: true,
});

export type ztUserMinimalDataOmitEmail = z.infer<
  typeof zUserMinimalDataOmitEmail
>;

export const zCommentType = z.object({
  comment: z.string(),
  user: zUserMinimalDataOmitEmail,
  _id: CommentIdTransformed,
  replies: z.array(zReplyType),
  repliesCount: z.number().default(0),
});

export type ztCommentType = z.infer<typeof zCommentType>;

export type ztPost = z.infer<typeof zPost>;

export const zPost = z.object({
  _id: PostIdTransformed,
  postHeading: z.string(),
  postBody: z.string(),
  userId: UserId,
  files: z.array(z.string()),
  images: z.array(z.string()),
  likes: z.number(),
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
