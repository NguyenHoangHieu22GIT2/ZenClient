import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useAuthStore } from "@/lib/storeZustand";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { Post } from "@/Types/Post";
import { z } from "zod";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Bearer } from "@/utils/Bearer";
import { checkImageType } from "@/utils/checkImageType";

export const CreatePost = (props: {}) => {
  const authToken = useAuthStore((state) => state.access_token);
  const { mutate, data, error, isLoading } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (data: Pick<Post, "postBody" | "images">) => {
      const formData = new FormData();
      formData.append("postBody", data.postBody);
      for (const file of data.images) {
        formData.append("files", file);
      }
      const data_1 = await api.post("/posts/create-post", formData, {
        headers: {
          authorization: Bearer(authToken),
        },
      });
      return data_1.data;
    },
  });
  const { toast } = useToast();
  const access_token = useAuthStore((state) => state.access_token);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadFile, setUploadFile] = useState<boolean>(false);
  const onDrop = useCallback(
    (files: File[]) => {
      let isValid = true;
      files.forEach((file) => {
        isValid = checkImageType(file);
      });
      isValid &&
        setFiles((prevArray: File[]) => {
          return [...prevArray, ...files];
        });
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  let uploadFileButton = !uploadFile ? (
    <Button
      onClick={() => {
        setUploadFile(true);
      }}
    >
      Image
    </Button>
  ) : (
    <Button
      onClick={() => {
        setUploadFile(false);
        setFiles([]);
      }}
    >
      Clear
    </Button>
  );
  let uploadFileElement;
  if (uploadFile) {
    uploadFileElement = (
      <>
        <div
          {...getRootProps()}
          className="p-3 border border-slate-400/70 rounded-sm text-slate-400/90"
        >
          <Input name="file0" {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>
              Drag &apos; n &apos; drop some files here, or click to select
              files
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {files.length > 0 &&
            files.map((image, index) => {
              return (
                <div key={index} className="relative">
                  <Image
                    src={`${URL.createObjectURL(image)}`}
                    alt=""
                    width={200}
                    height={200}
                  />
                  <span
                    className="absolute top-1 right-1 px-3 py-1 rounded-full cursor-pointer text-zinc-50 bg-slate-700/30"
                    onClick={() => {
                      setFiles((prevArray) => {
                        return prevArray.filter(
                          (file) => file.name !== image.name
                        );
                      });
                    }}
                  >
                    X
                  </span>
                </div>
              );
            })}
        </div>
      </>
    );
  }
  type postType = z.infer<typeof postSchema>;
  const postSchema = z.object({
    postBody: z.string().min(5),
  });
  const form = useForm<postType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      postBody: "",
    },
  });

  function createPost(values: postType) {
    if (!access_token) {
      return toast({
        title: "Login required",
        description: "Login to have full access on Poddy",
        action: <ToastAction altText="Okay">Alright</ToastAction>,
      });
    }

    mutate({ postBody: values.postBody, images: files });
  }
  return (
    <Card className="m-2 mx-auto w-full lg:max-w-[800px]">
      <CardHeader>
        <CardTitle>Express Yourself</CardTitle>
        <CardDescription>Show yourself to the world!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createPost)}>
            <FormField
              control={form.control}
              name="postBody"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="John, How do you feel? ☺️"
                      {...field}
                      disabled={isLoading ? true : false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-5">Post</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex gap-2  items-center">
        {uploadFileButton}
        <div className="">{uploadFileElement}</div>
      </CardFooter>
    </Card>
  );
};
