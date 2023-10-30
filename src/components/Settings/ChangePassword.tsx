import React, { useCallback } from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";
import { useAuthStore } from "@/lib/storeZustand";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEmailDto } from "@/dtos/change-email.dto";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { z } from "zod";
import { UserMinimalData } from "@/Types/User";
import { Cookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { ChangePasswordDto } from "@/dtos/change-password.dto";
export const ChangePassword = (props: {}) => {
  const router = useRouter();
  const cookie = new Cookies();
  const access_token = useAuthStore((state) => state.access_token);
  const { mutate, isLoading } = useMutation({
    mutationKey: ["change-email"],
    mutationFn: async (data: { password: string }) => {
      return api
        .patch(
          "/auth/password",
          { password: data.password },
          {
            headers: {
              Authorization: Bearer(access_token),
            },
          },
        )
        .then((data) => {
          return data.data;
        })
        .then((user: UserMinimalData) => {
          if (user._id) {
            cookie.remove("jwtToken");
            cookie.remove("userId");
            router.replace("/");
          }
        })
        .catch((err) => err);
    },
  });
  type ChangePasswordType = z.infer<typeof ChangePasswordDto>;
  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangeEmailDto),
    defaultValues: {
      password: "",
    },
  });

  const submit = useCallback((data: { password: string }) => {
    mutate(data);
  }, []);

  return (
    <Card className="p-5 ">
      <CardHeader>
        <CardTitle>Change Password:</CardTitle>
      </CardHeader>
      <div className="flex gap-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
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
