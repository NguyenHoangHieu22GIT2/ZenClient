import { z } from "zod";

export const postCreateDto = z.object({
  postBody: z.string().min(5),
  postHeading: z.string().min(0),
});
