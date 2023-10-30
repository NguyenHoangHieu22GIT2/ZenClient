import { z } from "zod";

export const ChangeEmailDto = z.object({
  email: z.string().email({ message: "The Field should be an email!" }),
});
