import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  zChangeNormalInformationDto,
  ztChangeNormalInformationDto,
} from "@/dtos/user/change-normal-information.dto";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { ztUser } from "@/Types/User";
import { notFound } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export default function Information() {
  const { mutate, isLoading, error } = useMutation({
    mutationKey: ["change-information"],
    mutationFn: async (data: ztChangeNormalInformationDto) => {
      const parsedData = zChangeNormalInformationDto.parse(data);
      return api
        .patch<ztChangeNormalInformationDto>(
          "users/change-information",
          parsedData,
          { withCredentials: true }
        )
        .then((result) => {
          // const parsedResult = zChangeNormalInformationDto.parse(result);
          return result;
        });
    },
  });

  const forms = useForm<ztChangeNormalInformationDto>({
    resolver: zodResolver(zChangeNormalInformationDto),
    defaultValues: {
      description: "",
    },
  });
  function submit(data: ztChangeNormalInformationDto) {
    mutate(data);
  }
  if (error) {
    notFound();
  }
  return (
    <Card className="p-5 my-2 w-2/4 mx-auto">
      <CardHeader>
        <CardTitle>Public Information:</CardTitle>
        <CardDescription>Change what people will see you</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(submit)}>
            <FormField
              control={forms.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write what you want people to know about you"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-5">Change</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
