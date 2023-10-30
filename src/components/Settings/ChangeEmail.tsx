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
export const ChangeEmail = () => {
  const router = useRouter();
  const cookie = new Cookies();
  const access_token = useAuthStore((state) => state.access_token);
  const { mutate, isLoading } = useMutation({
    mutationKey: ["change-email"],
    mutationFn: async (data: { email: string }) => {
      return api
        .patch(
          "/auth/email",
          { email: data.email },
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
  type changEmailType = z.infer<typeof ChangeEmailDto>;
  const form = useForm<changEmailType>({
    resolver: zodResolver(ChangeEmailDto),
    defaultValues: {
      email: "",
    },
  });

  const submit = useCallback((data: { email: string }) => {
    mutate(data);
  }, []);

  return (
    <Card className="p-5 ">
      <CardHeader>
        <CardTitle>Change Email:</CardTitle>
      </CardHeader>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Email"
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
