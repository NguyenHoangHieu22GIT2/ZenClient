import { User } from "./User";

type ResponseType<TStatus, TSuccess, TError> = TStatus extends "success"
  ? TSuccess
  : TStatus extends "error"
  ? TError
  : never;

export type RegisterResponse<T extends "sucess" | "error"> = ResponseType<
  T,
  Pick<User, "username" | "password" | "gender" | "email">,
  { response: { data: { error: string; message: string } } }
>;
export type LoginResponse<T extends "success" | "error"> = ResponseType<
  T,
  { access_token: string },
  { response: { data: { error: string; message: string } } }
>;
