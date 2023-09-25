import { Brand } from "./Brand";
import { GroupId } from "./Group";
import { UserId } from "./User";
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
  postBody: string;
  userId: UserId;
  images: string[] | File[];
  likes: UserId[];
  comments: CommentType[];
  mode: Mode;
  GroupId: GroupId;
};
