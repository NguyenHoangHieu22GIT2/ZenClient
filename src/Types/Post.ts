import { Brand } from "./Brand";
import { GroupId } from "./Group";
import { User, UserId } from "./User";
import { Types } from "mongoose";
export enum Mode {
  "global",
  "private",
  "normal",
}
export type PostId = Brand<string, "PostId">;

export type CommentType = {
  comment: string;
  userId: UserId;
  _id: string;
  replies: {
    comment: string;
    userId: UserId;
    _id: Types.ObjectId;
  }[];
}[];
export type Post = {
  _id?: PostId;
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
};
