import { User } from "./User";

type ResponseType<
  TStatus extends "success" | "error",
  TSuccess,
  TError
> = TStatus extends "success"
  ? TSuccess
  : TStatus extends "error"
  ? TError
  : never;

export type RegisterResponse<TStatus extends "success" | "error"> =
  ResponseType<
    TStatus,
    Pick<User, "username" | "password" | "gender" | "email">,
    { response: { data: { error: string; message: string } } }
  >;
export type LoginResponse<TStatus extends "success" | "error"> = ResponseType<
  TStatus,
  { access_token: string },
  { response: { data: { error: string; message: string } } }
>;
