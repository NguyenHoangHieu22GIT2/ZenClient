import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { User } from "@/Types/User";
import { AxiosError } from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { LoginResponse } from "@/Types/ResponseType";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";
import Image from "next/image";
import { userLoginDto } from "@/dtos/user-login.dto";
import { useAuthStore } from "@/lib/storeZustand";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
export function useLoginPage() {
  const cookie = new Cookies();
  const onChangeAccessToken = useAuthStore((state) => state.changeAccessToken);
  const router = useRouter();
  const { toast } = useToast();
  const loginUserMutation = useMutation({
    mutationFn: (existingUser: LoginUser) => {
      return api
        .post(process.env.NEXT_PUBLIC_SERVER_AUTH_LOGIN, existingUser)
        .then((data) => {
          return data.data;
        });
    },
  });
  useEffect(() => {
    if (!loginUserMutation.isLoading && loginUserMutation.data) {
      const result = loginUserMutation.data as LoginResponse<"success">;
      cookie.set("jwtToken", result.access_token, {
        // httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: 3600000,
      });
      onChangeAccessToken(result.access_token);
      toast({
        title: "Login Successfully",
        action: <ToastAction altText="Great!">Great!</ToastAction>,
      });
      router.replace("/");
    }
    if (!loginUserMutation.isLoading && loginUserMutation.error) {
      const error = loginUserMutation.error as LoginResponse<"error">;
      console.log(loginUserMutation);
      toast({
        title: error.response.data.message,
        description: error.response.data.error,
        action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>,
      });
    }
  }, [loginUserMutation.data, loginUserMutation.isLoading]);

  const form = useForm<LoginUser>({
    resolver: zodResolver(userLoginDto),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: LoginUser) {
    loginUserMutation.mutate(values);
  }
  type LoginUser = z.infer<typeof userLoginDto>;
  return {
    form,
    onSubmit,
    loginUserMutation,
  };
}
