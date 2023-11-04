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
import jsCookie from "js-cookie";
export const ChangeEmail = () => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["change-email"],
    mutationFn: async (data: { email: string }) => {
      return api
        .patch(
          "/auth/email",
          { email: data.email },
          {
            withCredentials: true,
          }
        )
        .then((data) => {
          return data.data;
        })
        .then((user: ztUserMinimalData) => {
          const parsedUser = zUserMinimalData.parse(user);
          if (parsedUser._id) {
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
