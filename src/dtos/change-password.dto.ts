import { z } from "zod";

export const ChangePasswordDto = z.object({
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "The password should have at least 1 lowercase, 1 uppercase, 1 number, 1 symbol and at least 5 characters",
      },
    ),
});
