import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/Types/User";

type props = {
  onChangeStep: (user: Partial<User>) => void;
  user: Partial<User>
};

export const RegisterFirstStep = (props: props) => {
  const createUserSchema = z
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
          },
        ),
      gender: z.enum(["male", "female"]),
      confirmPassword: z.string(),
    })
    .refine((data) => data.confirmPassword === data.password, {
      message: "The passwords don't match",
      path: ["confirmPassword"]
    });
  type createUserType = z.infer<typeof createUserSchema>;
  const form = useForm<createUserType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      email: props.user.email ? props.user.email : "",
      gender: props.user.gender ? props.user.gender : "male",
      username: props.user.username ? props.user.username : ""
    }
  });
  function submit({ username, email, gender, password }: createUserType) {
    const result: Partial<User> = {
      username,
      email, gender, password
    }
    props.onChangeStep(result);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                {/* <Input placeholder="gender" type="hidden" {...field} /> */}
                <Select onValueChange={field.onChange} required={true}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="confirm the password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4">Create</Button>
      </form>
    </Form>
  );
};
