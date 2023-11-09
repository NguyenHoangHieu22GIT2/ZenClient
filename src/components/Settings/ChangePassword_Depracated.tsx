import React, { useCallback } from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEmailDto } from "@/dtos/change-email.dto";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zUserMinimalData, ztUserMinimalData } from "@/Types/User";
import { useRouter } from "next/navigation";
import { ChangePasswordDto } from "@/dtos/change-password.dto";
import jsCookie from "js-cookie";
export const ChangePassword = (props: {}) => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["change-email"],
    mutationFn: async (data: ChangePasswordType) => {
      return api
        .patch("/auth/password", data, {
          withCredentials: true,
        })
        .then((data) => {
          return data.data;
        })
        .then((user: ztUserMinimalData) => {
          const parsedUser = zUserMinimalData.parse(user);
          if (parsedUser._id) {
            router.replace("/");
          }
          return parsedUser;
        })
        .catch((err) => err);
    },
  });
  type ChangePasswordType = z.infer<typeof ChangePasswordDto>;
  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordDto),
    defaultValues: {
      newPassword: "",
      oldPassword: "",
    },
  });

  const submit = (data: ChangePasswordType) => {
    mutate(data);
  };

  return (
    <Card className="p-5 ">
      <CardHeader>
        <CardTitle>Change Password:</CardTitle>
      </CardHeader>
      <div className="flex gap-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <FormField
              name="oldPassword"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Old Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="newPassword"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="New Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button className="mt-5">Change</Button>
          </form>
        </Form>
      </div>
    </Card>
  );
};
