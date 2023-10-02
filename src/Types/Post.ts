import { Brand } from "./Brand";

import { GroupId } from "./Group";

import { User, UserId } from "./User";

export type Mode = "global" | "private" | "normal";

export type PostId = Brand<string, "PostId">;

export type CommentId = Brand<string, "CommentId">;

export type ReplyType = {
  comment: string;
  userId: UserId;
  user: Pick<User, "avatar" | "username">;
  _id: CommentId;
};

export type CommentType = {
  comment: string;
  userId: UserId;
  user: Pick<User, "avatar" | "username">;
  _id: CommentId;
  replies: ReplyType[];
  repliesCount: number;
};

export type Post = {
  _id: PostId;
  postHeading: string;
  postBody: string;
  userId: UserId;
  images: string[];
  likes: UserId[];
  views: number;
  comments: CommentType[];
  mode: Mode;
  user: User;
  createdAt: string;
  isLiked?: boolean;
  commentsCount: number;
};

export type PostGroup = {
  _id: PostId;
  postHeading: string;
  postBody: string;
  userId: UserId;
  images: string[];
  likes: UserId[];
  views: number;
  comments: CommentType[];
  mode: Mode;
  GroupId: GroupId;
  user: User;
  createdAt: Date;
  isLiked?: boolean;
};
