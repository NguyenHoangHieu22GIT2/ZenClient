import { z } from "zod";

export const userRegisterFirstStepDto = z
  .object({
    email: z.string().email({ message: "The Field should be an email" }),
    username: z
      .string()
      .min(5, { message: "Username needs to be at least 5 characters" })
      .max(255, { message: "Username needs to be less than 255 characters" }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "The password should have at least 1 lowercase, 1 uppercase, 1 number, 1 symbol and at least 5 characters",
        }
      ),
    gender: z.enum(["male", "female"]),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "The passwords don't match",
    path: ["confirmPassword"],
  });
