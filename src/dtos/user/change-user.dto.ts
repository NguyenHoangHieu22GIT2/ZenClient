import { z } from "zod";

export const ChangeUsernameDto = z.object({
  username: z.string().min(5),
});
