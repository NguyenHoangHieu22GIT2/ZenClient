type ResponseType<TStatus, TSuccess, TError> = TStatus extends "success"
  ? TSuccess
  : TStatus extends "error"
  ? TError
  : never;

export type LoginResponse<T extends "success" | "error"> = ResponseType<
  T,
  { access_token: string },
  { response: { data: { error: string; message: string } } }
>;
