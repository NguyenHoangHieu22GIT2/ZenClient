"use client";
import { useAuthStore } from "@/lib/storeZustand";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { Post } from "@/Types/Post";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Bearer } from "@/utils/Bearer";
import { checkImageType } from "@/utils/checkImageType";
export function FormCreatePost() {
  // const authToken = useAuthStore((state) => state.access_token);
  // const { mutate, data, error, isLoading } = useMutation({
  //   mutationKey: ["createPost"],
  //   mutationFn: async (
  //     data: Pick<Post, "postBody" | "postHeading"> & { images: File[] }
  //   ) => {
  //     const formData = new FormData();
  //     formData.append("postBody", data.postBody);
  //     formData.append("postHeading", data.postHeading);
  //     for (const file of data.images) {
  //       formData.append("files", file);
  //     }
  //     const data_1 = await api.post("/posts/create-post", formData, {
  //       headers: {
  //         authorization: Bearer(authToken),
  //       },
  //     });
  //     return data_1.data;
  //   },
  // });
  // const { toast } = useToast();
  // const access_token = useAuthStore((state) => state.access_token);
  // const [files, setFiles] = useState<File[]>([]);
  // const [uploadFile, setUploadFile] = useState<boolean>(false);
  // const onDrop = useCallback(
  //   (files: File[]) => {
  //     let isValid = true;
  //     files.forEach((file) => {
  //       isValid = checkImageType(file);
  //     });
  //     isValid &&
  //       setFiles((prevArray: File[]) => {
  //         return [...prevArray, ...files];
  //       });
  //   },
  //   [setFiles]
  // );
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  // let uploadFileButton = !uploadFile ? (
  //   <Button
  //     onClick={() => {
  //       setUploadFile(true);
  //     }}
  //   >
  //     Image
  //   </Button>
  // ) : (
  //   <Button
  //     onClick={() => {
  //       setUploadFile(false);
  //       setFiles([]);
  //     }}
  //   >
  //     Clear
  //   </Button>
  // );
  // let uploadFileElement;
  // if (uploadFile) {
  //   uploadFileElement = (
  //     <>
  //       <div
  //         {...getRootProps()}
  //         className="p-3 border border-slate-400/70 rounded-sm text-slate-400/90"
  //       >
  //         <Input name="file0" {...getInputProps()} />
  //         {isDragActive ? (
  //           <p>Drop the files here ...</p>
  //         ) : (
  //           <p>
  //             Drag &apos; n &apos; drop some files here, or click to select
  //             files
  //           </p>
  //         )}
  //       </div>
  //       <div className="flex flex-wrap gap-2">
  //         {files.length > 0 &&
  //           files.map((image, index) => {
  //             return (
  //               <div key={index} className="relative">
  //                 <Image
  //                   src={`${URL.createObjectURL(image)}`}
  //                   alt=""
  //                   width={200}
  //                   height={200}
  //                 />
  //                 <span
  //                   className="absolute top-1 right-1 px-3 py-1 rounded-full cursor-pointer text-zinc-50 bg-slate-700/30"
  //                   onClick={() => {
  //                     setFiles((prevArray) => {
  //                       return prevArray.filter(
  //                         (file) => file.name !== image.name
  //                       );
  //                     });
  //                   }}
  //                 >
  //                   X
  //                 </span>
  //               </div>
  //             );
  //           })}
  //       </div>
  //     </>
  //   );
  // }
  // type postType = z.infer<typeof postSchema>;
  // const postSchema = z.object({
  //   postBody: z.string().min(5),
  //   postHeading: z.string().min(0),
  // });
  // const form = useForm<postType>({
  //   resolver: zodResolver(postSchema),
  //   defaultValues: {
  //     postBody: "",
  //     postHeading: "",
  //   },
  // });

  // function createPost(values: postType) {
  //   if (!access_token) {
  //     return toast({
  //       title: "Login required",
  //       description: "Login to have full access on Poddy",
  //       action: <ToastAction altText="Okay">Alright</ToastAction>,
  //     });
  //   }

  //   mutate({
  //     postBody: values.postBody,
  //     postHeading: values.postHeading,
  //     images: files,
  //   });
  // }
  return (
    <>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(createPost)}>
          <FormField
            control={form.control}
            name="postHeading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heading</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John, How do you feel? ☺️"
                    {...field}
                    disabled={isLoading ? true : false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postBody"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paragraph</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more"
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
      {uploadFileButton}
      <div className="">{uploadFileElement}</div> */}
    </>
  );
}
