import { User } from "@/Types/User";
import jwt from "jwt-decode";
import { cookies } from "next/headers";
export function jwtCookieToObject(): User {
  const jwtToken = cookies().get("jwtToken")?.value;
  if (jwtToken) {
    return jwt(jwtToken);
  } else {
    throw new Error("JWT COOKIE WRONG");
  }
}
