export type User = {
  email: string;
  password: string;
  avatar: string | File;
  username: string;
  gender: "male" | "female"
}
