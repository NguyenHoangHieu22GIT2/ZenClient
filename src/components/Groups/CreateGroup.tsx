import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zGroup, zGroupCreate, ztGroup, ztGroupCreate } from "@/Types/Group";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useDropzone } from "react-dropzone";
import { checkImageType } from "@/utils/checkImageType";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
export default function CreateGroup() {
  const { toast } = useToast();
  const { mutate, isLoading, error } = useMutation({
    mutationKey: ["CreateGroup"],
    mutationFn: (data: ztGroupCreate) => {
      const parsedData = zGroupCreate.parse(data);
      const formData = new FormData();
      formData.append("isPrivate", parsedData.isPrivate.toString());
      formData.append("groupName", parsedData.groupName);
      formData.append("groupDescription", parsedData.groupDescription);
      if (parsedData.groupAvatarFile)
        formData.append("groupAvatarFile", parsedData.groupAvatarFile);
      return api
        .post<ztGroup>("/groups/create-group", formData, {
          withCredentials: true,
        })
        .then((data) => {
          const parsedGroup = zGroup.parse(data.data);
          toast({
            title: "Create Group Successfully!",
            description: "Now you can go and create your community!",
            action: <ToastAction altText="Great">Great!</ToastAction>,
          });
          return parsedGroup;
        })
        .catch((err) => {
          toast({
            title: "Create Group Failed!",
            description:
              "Looks like there are some errors from our side :( wait for minutes and try again",
            action: <ToastAction altText="Aww">Aww!</ToastAction>,
          });
        });
    },
  });

  const form = useForm<ztGroupCreate>({
    resolver: zodResolver(zGroupCreate),
    defaultValues: {
      groupAvatarFile: undefined,
      groupDescription: "",
      groupName: "",
      isPrivate: true,
    },
  });

  function submit(values: ztGroupCreate) {
    const parsedValues = zGroupCreate.parse(values);
    mutate(parsedValues);
  }

  const onDrop = useCallback(
    (files: File[]) => {
      let isValid = checkImageType(files[0]);

      isValid && form.setValue("groupAvatarFile", files[0]);
    },
    [form.getValues("groupAvatarFile")]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Group</CardTitle>
        <CardDescription>
          Your own group, your own rules, your own interests :)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col [&>*]:mt-5"
            onSubmit={form.handleSubmit(submit)}
          >
            <FormField
              control={form.control}
              name="groupName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>group Name</FormLabel>
                  <FormControl>
                    <Input placeholder="group Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="groupDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>group Description</FormLabel>
                  <FormControl>
                    <Input placeholder="group Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="groupAvatarFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>group Avatar</FormLabel>
                  <FormControl {...getRootProps()}>
                    <div>
                      <Input name="file" {...getInputProps()} />
                      {!form.getValues("groupAvatarFile") && (
                        <p>Drop the image here ...</p>
                      )}
                    </div>
                  </FormControl>
                  {form.getValues("groupAvatarFile") && (
                    <Image
                      src={`${URL.createObjectURL(
                        form.getValues("groupAvatarFile")!
                      )}`}
                      alt=""
                      width={200}
                      height={200}
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPrivate"
              render={({ field }) => (
                <FormItem className="flex cursor-pointer gap-3 items-center">
                  <FormControl>
                    <Checkbox
                      name="isPrivate"
                      defaultChecked={true}
                      onClick={(value) => {
                        field.value = !field.value;
                      }}
                    />
                    {/* <Check placeholder="Email" {...field} /> */}
                  </FormControl>
                  <FormLabel className="cursor-pointer" id="isPrivate">
                    is Private
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading}>Create</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
