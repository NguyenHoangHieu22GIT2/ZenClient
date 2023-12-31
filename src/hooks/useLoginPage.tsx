import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { LoginResponse, zErrorResponse } from "@/Types/ResponseType";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";
import Cookie from "universal-cookie";
import { userLoginDto } from "@/dtos/auth/user-login.dto";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { zLoginResponse, ztLoginResponse, ztUser } from "@/Types/User";
export function useLoginPage() {
  const cookie = new Cookies();
  const router = useRouter();
  const { toast } = useToast();
  const loginUserMutation = useMutation({
    mutationFn: (existingUser: LoginUser) => {
      return api
        .post<ztLoginResponse>(
          process.env.NEXT_PUBLIC_SERVER_AUTH_LOGIN,
          existingUser,
          {
            withCredentials: true,
          }
        )
        .then((data) => {
          return data.data;
        });
    },
  });
  const acookie = new Cookie();
  useEffect(() => {
    try {
      if (!loginUserMutation.isLoading && loginUserMutation.data) {
        const result = loginUserMutation.data as LoginResponse<"success">;
        //TODO: I WILL THINK ABOUT PARSE AND SAFEPARSE IN THE FUTURE
        const parsedResult = zLoginResponse.parse(result);
        cookie.set("userId", parsedResult.userId, {
          maxAge: 3600000,
        });
        toast({
          title: "Login Successfully",
          action: <ToastAction altText="Great!">Great!</ToastAction>,
        });
        router.replace("/");
      }
      if (!loginUserMutation.isLoading && loginUserMutation.error) {
        const error = loginUserMutation.error as LoginResponse<"error">;
        const parsedError = zErrorResponse.parse(error);
        toast({
          title: parsedError.response.data.message,
          description: parsedError.response.data.error,
          action: (
            <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
          ),
        });
      }
    } catch (error) {
      throw new Error("Something went wrong");
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
