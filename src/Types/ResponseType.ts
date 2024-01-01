import { z } from "zod";
import { zPost, ztPost } from "./Post";
import { zUser, ztLoginResponse, ztUser, ztUserMinimalData } from "./User";
import { ztChangeGroupInfoWithoutAvatarDto } from "@/dtos/group/group-info.dto";

type ResponseType<TStatus, TSuccess, TError> = TStatus extends "success"
  ? TSuccess
  : TStatus extends "error"
  ? TError
  : never;

type Status = "success" | "error";

export type ztErrorResponse = z.infer<typeof zErrorResponse>;

export const zErrorResponse = z.object({
  response: z.object({
    data: z.object({
      error: z.string(),
      message: z.string(),
    }),
  }),
});

export type RegisterResponse<TStatus extends Status> = ResponseType<
  TStatus,
  ztUserMinimalData,
  ztErrorResponse
>;

export type LoginResponse<TStatus extends Status> = ResponseType<
  TStatus,
  ztLoginResponse,
  ztErrorResponse
>;

export type createPostResponse<TStatus extends Status> = ResponseType<
  TStatus,
  ztPost,
  ztErrorResponse
>;

export type getPostsResponse<TStatus extends Status> = ResponseType<
  TStatus,
  ztPost[],
  ztErrorResponse
>;

export type changeInformationResponse<TStatus extends Status> = ResponseType<
  TStatus,
  ztUserMinimalData,
  ztErrorResponse
>;

export type changeGroupInformationResponse<TStatus extends Status> =
  ResponseType<TStatus, ztChangeGroupInfoWithoutAvatarDto, ztErrorResponse>;
