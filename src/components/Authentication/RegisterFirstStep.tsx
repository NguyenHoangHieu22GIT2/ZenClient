import React, { useEffect } from "react";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/Types/User";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { useToast } from "../ui/use-toast";
import { RegisterResponse } from "@/Types/ResponseType";
import { ToastAction } from "../ui/toast";
import { ButtonWithLoadingState } from "../ui/ButtonWithLoadingState";

type props = {
  onChangeStep: (user: Partial<User>) => void;
  onSetUser: (userInfo: Partial<User>) => void;
};

export const RegisterFirstStep = (props: props) => {
  const { toast } = useToast();
  const { mutate, error, isLoading, data } = useMutation({
    mutationFn: async (
      data: Pick<User, "email" | "username" | "gender" | "password">
    ) => {
      return api
        .post("/auth/validate-user", data)
        .then((result) => result.data);
    },
  });
  useEffect(() => {
    if (!isLoading && data) {
      props.onChangeStep(data);
    } else if (!isLoading && error) {
      const theError = error as RegisterResponse<"error">;
      toast({
        title: theError.response.data.error,
        description: theError.response.data.message,
        action: <ToastAction altText="Okay!">Okay!</ToastAction>,
      });
    }
  }, [error, isLoading, data]);
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
          }
        ),
      gender: z.enum(["male", "female"]),
      confirmPassword: z.string(),
    })
    .refine((data) => data.confirmPassword === data.password, {
      message: "The passwords don't match",
      path: ["confirmPassword"],
    });
  type createUserType = z.infer<typeof createUserSchema>;
  const form = useForm<createUserType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      email: "",
      gender: "male",
      username: "",
    },
  });
  function submit({ username, email, gender, password }: createUserType) {
    const result: Pick<User, "email" | "username" | "gender" | "password"> = {
      username,
      email,
      gender,
      password,
    };
    props.onSetUser({
      email,
      username,
      gender,
      password,
    });
    mutate(result);
  }
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3"
        onSubmit={form.handleSubmit(submit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading ? true : false}
                  placeholder="Email"
                  {...field}
                />
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
                <Input
                  disabled={isLoading ? true : false}
                  placeholder="username"
                  {...field}
                />
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
                <Select
                  disabled={isLoading ? true : false}
                  onValueChange={field.onChange}
                  required={true}
                >
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
                <Input
                  placeholder="password"
                  type="password"
                  disabled={isLoading ? true : false}
                  {...field}
                />
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
                  disabled={isLoading ? true : false}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonWithLoadingState isLoading={isLoading} children={"Next Step"} />
      </form>
    </Form>
  );
};
