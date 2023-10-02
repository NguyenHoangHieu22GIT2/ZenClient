import { useAuthStore } from "@/lib/storeZustand";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { Post } from "@/Types/Post";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Bearer } from "@/utils/Bearer";
import { checkImageType } from "@/utils/checkImageType";
import { postCreateDto } from "@/dtos/post-create.dto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export function useFormCreatePost() {
  const user = useAuthStore((state) => state);
  const { mutate, data, error, isLoading } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (
      data: Pick<Post, "postBody" | "postHeading"> & { images: File[] }
    ) => {
      const formData = new FormData();
      formData.append("postBody", data.postBody);
      formData.append("postHeading", data.postHeading);
      for (const file of data.images) {
        formData.append("files", file);
      }
      const data_1 = await api.post("/posts/create-post", formData, {
        headers: {
          authorization: Bearer(user.access_token),
        },
      });
      return data_1.data;
    },
  });
  const { toast } = useToast();
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
  type postType = z.infer<typeof postCreateDto>;

  const form = useForm<postType>({
    resolver: zodResolver(postCreateDto),
    defaultValues: {
      postBody: "",
      postHeading: "",
    },
  });

  function createPost(values: postType) {
    if (!user.access_token) {
      return toast({
        title: "Login required",
        description: "Login to have full access on Poddy",
        action: <ToastAction altText="Okay">Alright</ToastAction>,
      });
    }

    mutate({
      postBody: values.postBody,
      postHeading: values.postHeading,
      images: files,
    });
  }
  return {
    uploadFileButton,
    uploadFileElement,
    files,
    mutate,
    data,
    error,
    isLoading,
    toast,
    createPost,
    form,
    user,
  };
}
