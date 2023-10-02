import React, { useCallback, useEffect } from "react";
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
import { User, UserRegisterStepOne } from "@/Types/User";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { useToast } from "../ui/use-toast";
import { RegisterResponse } from "@/Types/ResponseType";
import { ToastAction } from "../ui/toast";
import { ButtonWithLoadingState } from "../ui/ButtonWithLoadingState";
import { userRegisterFirstStepDto } from "@/dtos/user-register-first-step.dto";

type props = {
  onChangeStep: (user: UserRegisterStepOne) => void;
  onSetUser: (userInfo: UserRegisterStepOne) => void;
};

export const RegisterFirstStep = (props: props) => {
  const { toast } = useToast();
  const { mutate, error, isLoading, data } = useMutation({
    mutationFn: async (
      data: Pick<User, "email" | "username" | "gender" | "password">
    ) => {
      return api
        .post(process.env.NEXT_PUBLIC_SERVER_AUTH_VALIDATE_REGISTER, data)
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

  type createUserType = z.infer<typeof userRegisterFirstStepDto>;
  const form = useForm<createUserType>({
    resolver: zodResolver(userRegisterFirstStepDto),
    defaultValues: {
      password: "",
      confirmPassword: "",
      email: "",
      gender: "male",
      username: "",
    },
  });
  const submit = useCallback(
    ({ username, email, gender, password }: createUserType) => {
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
    },
    []
  );
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
