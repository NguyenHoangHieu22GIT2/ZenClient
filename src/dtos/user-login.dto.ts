import { z } from "zod";

export const userLoginDto = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "Please type out Letters",
    })
    .email({ message: "It should be an email" }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "The password should have at least 1 lowercase, 1 uppercase, 1 number, 1 symbol and at least 5 characters",
      }
    ),
});
