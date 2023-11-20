import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { zPostCreate, ztPost, ztPostCreate } from "@/Types/Post";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Bearer } from "@/utils/Bearer";
import { checkImageType } from "@/utils/checkImageType";
import { postCreateDto } from "@/dtos/post/post-create.dto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkFileTypeToUseIconOrImage } from "@/utils/CheckFileType";
import { GroupId } from "@/Types/Group";
export function useFormCreatePost(groupId?: string) {
  const { mutate, data, error, isLoading } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (data: ztPostCreate) => {
      const parsedData = zPostCreate.parse(data);
      const formData = new FormData();
      formData.append("postBody", parsedData.postBody);
      formData.append("postHeading", parsedData.postHeading);
      if (groupId) formData.append("groupId", groupId);
      for (const file of parsedData.files || []) {
        formData.append("files", file);
      }
      const data_1 = await api.post("/posts/create-post", formData, {
        withCredentials: true,
      });
      return data_1.data;
    },
  });
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [uploadFile, setUploadFile] = useState<boolean>(false);
  const onDrop = useCallback(
    (files: File[]) => {
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
      File
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
        <div className="flex flex-wrap gap-2 mt-5">
          {files.length > 0 &&
            files.map((file, index) => {
              const isImage = checkImageType(file);
              return (
                <div key={index} className="relative">
                  <Image
                    className={`${
                      isImage
                        ? "w-[200px] min-w-[100px] max-w-[300px]"
                        : "w-[200px] min-w-[100px] max-w-[300px] aspect-square"
                    }`}
                    src={`${
                      isImage
                        ? URL.createObjectURL(file)
                        : checkFileTypeToUseIconOrImage(file.type)
                    }`}
                    alt=""
                    width={200}
                    height={200}
                  />
                  {!isImage && <h1>{file.name}</h1>}
                  <button
                    className="absolute top-1 right-1 px-3 py-1 rounded-full cursor-pointer text-zinc-50 bg-slate-700/30"
                    onClick={() => {
                      setFiles((prevArray) => {
                        return prevArray.filter(
                          (file) => file.name !== file.name
                        );
                      });
                    }}
                  >
                    X
                  </button>
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
    mutate({
      postBody: values.postBody,
      postHeading: values.postHeading,
      files: files,
      groupId: groupId || null,
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
  };
}
