import Image from "next/image";
import { Heading } from "../ui/Heading";
import React, { useCallback, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  zUser,
  zUserRegisterStepOne,
  zUserRegisterStepTwo,
  ztUserRegisterStepOne,
  ztUserRegisterStepTwo,
} from "@/Types/User";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { randomBytes } from "crypto";
import { checkImageType } from "@/utils/checkImageType";
interface props {
  onFinishStep: (userInfo?: ztUserRegisterStepOne) => void;
  onStepBack: () => void;
  user: ztUserRegisterStepOne;
}

export const RegisterSecondStep = React.memo((props: props) => {
  const { mutate, isLoading, data, error } = useMutation({
    mutationFn: async (user: ztUserRegisterStepTwo | ztUserRegisterStepOne) => {
      const parsedData = zUserRegisterStepTwo.parse(user);
      const formData = new FormData();
      let key: keyof ztUserRegisterStepTwo;
      for (key in user) {
        formData.append(key, parsedData[key]!);
      }
      return (
        await api.post(process.env.NEXT_PUBLIC_SERVER_AUTH_REGISTER, formData)
      ).data;
    },
  });
  const [file, setFile] = useState<File>();
  const onDrop = useCallback(
    (files: File[]) => {
      let isValid = checkImageType(files[0]);

      isValid && setFile(files[0]);
    },
    [setFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const finishStep = useCallback(() => {
    const salt = randomBytes(12).toString("hex");
    if (file) {
      mutate({ ...props.user, avatarFile: file });
    } else {
      mutate(props.user);
    }
    props.onFinishStep();
  }, [file, props.onFinishStep]);
  return (
    <div>
      <div>
        <Button onClick={props.onStepBack}>Back</Button>
      </div>
      <h1 className="text-center font-bold text-xl mb-4 ">Insert an avatar</h1>
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
      <div className="grid grid-cols-2 mt-5 gap-2">
        <Button variant={"ghost"} onClick={finishStep}>
          Skip
        </Button>
        <Button onClick={finishStep} variant={"default"}>
          Alright
        </Button>
      </div>
    </div>
  );
});
