"use client";
import { changeGroupInformationResponse } from "@/Types/ResponseType";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  zChangeGroupInfoWithoutAvatarDto,
  ztChangeGroupInfoWithoutAvatarDto,
} from "@/dtos/group/group-info.dto";
import { api } from "@/lib/axios.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type props = {
  groupInfo: ztChangeGroupInfoWithoutAvatarDto;
  groupId: string;
};

export default function GroupSetting({ groupInfo, groupId }: props) {
  const { toast } = useToast();
  const { isLoading, data, error, mutate } = useMutation({
    mutationKey: ["change-group-information"],
    mutationFn: (data: ztChangeGroupInfoWithoutAvatarDto) => {
      return (
        api
          .patch<ztChangeGroupInfoWithoutAvatarDto>(
            `groups/${groupId}`,
            {
              ...data,
              isPrivate: `${data.isPrivate}`,
            },
            {
              withCredentials: true,
            }
          )
          .then((result) => {
            return result.data;
          })
          // .then((data) => {
          //   const parsedData = zChangeGroupInfoWithoutAvatarDto.parse(data);
          //   return parsedData;
          // })
          .catch((err) => {
            const error = err as changeGroupInformationResponse<"error">;
            toast({
              title: error.response.data.error,
              description: error.response.data.message,
              action: <ToastAction altText="okay">Alright</ToastAction>,
            });
            return error;
          })
      );
    },
  });

  const form = useForm<ztChangeGroupInfoWithoutAvatarDto>({
    resolver: zodResolver(zChangeGroupInfoWithoutAvatarDto),
    defaultValues: {
      groupName: "",
      groupDescription: "",
      isPrivate: false,
    },
  });
  const submit = (data: ztChangeGroupInfoWithoutAvatarDto) => {
    mutate(data);
  };
  return (
    <Card className="mt-5">
      <CardTitle>
        <CardHeader>Change Group's main information</CardHeader>
      </CardTitle>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(submit)}
          >
            <FormField
              control={form.control}
              name="groupName"
              render={({ field }) => {
                const { value, ...theField } = field;
                return (
                  <FormItem>
                    <FormLabel>Group Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={"Group Name here"}
                        defaultValue={groupInfo.groupName}
                        {...theField}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="groupDescription"
              render={({ field }) => {
                const { value, ...theField } = field;
                return (
                  <FormItem>
                    <FormLabel>Group Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={"Group Description here"}
                        defaultValue={groupInfo.groupDescription}
                        {...theField}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="isPrivate"
              render={({ field }) => {
                return (
                  <FormItem className="flex cursor-pointer gap-3 items-center">
                    <FormControl>
                      <Checkbox
                        name="isPrivate"
                        defaultChecked={groupInfo.isPrivate}
                        onClick={(value) => {
                          field.value = !field.value;
                        }}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer" id="isPrivate">
                      is Private
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button>Change</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
