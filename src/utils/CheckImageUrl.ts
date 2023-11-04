import { z } from "zod";
import { imageUrl } from "./imageUrl";

export function CheckImageUrl(url: string | null) {
  try {
    const parsedUrl = z.string().min(10).parse(url);
    return parsedUrl !== "/default-user.jpeg"
      ? imageUrl(parsedUrl)
      : "/default-user.jpeg";
  } catch (error) {
    return "/default-user.jpeg";
  }
}
