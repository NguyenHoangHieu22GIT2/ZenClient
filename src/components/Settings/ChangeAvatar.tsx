import React, { useCallback, useState } from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEmailDto } from "@/dtos/change-email.dto";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { z } from "zod";
import { zUserMinimalData, ztUserMinimalData } from "@/Types/User";
import { useRouter } from "next/navigation";
import jsCookie from "js-cookie";
import { useDropzone } from "react-dropzone";
import { checkImageType } from "@/utils/checkImageType";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";
export const ChangeAvatar = () => {
  const [file, setFile] = useState<File>();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["change-email"],
    mutationFn: async (data: File) => {
      const formData = new FormData();
      formData.append("avatar", data);
      return api
        .patch("/users/upload-avatar", formData, {
          withCredentials: true,
        })
        .then((data) => {
          return data.data;
        })
        .then((user: ztUserMinimalData) => {
          const parsedUser = zUserMinimalData.parse(user);
          return parsedUser;
        })
        .catch((err) => err);
    },
  });
  const onDrop = useCallback(
    (files: File[]) => {
      let isValid = checkImageType(files[0]);

      isValid && setFile(files[0]);
    },
    [setFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card className="p-5 ">
      <CardHeader>
        <CardTitle>Change Avatar:</CardTitle>
      </CardHeader>
      <div className="">
        <div
          {...getRootProps()}
          className="w-[50%] mx-auto relative aspect-square rounded-full border-4 border-dashed overflow-hidden bg-red-300 hover:bg-red-400 cursor-pointer transition"
        >
          {file ? (
            <Image
              className="w-full aspect-square"
              src={URL.createObjectURL(file)}
              alt=""
              width={700}
              height={700}
            />
          ) : (
            <AiOutlineUser className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full" />
          )}
          <Input
            className="w-full aspect-square "
            name="file0"
            {...getInputProps()}
          />
        </div>
        <Button
          disabled={isLoading}
          onClick={() => {
            if (file) {
              mutate(file);
            }
          }}
        >
          Change
        </Button>
      </div>
    </Card>
  );
};
