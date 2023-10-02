"use client";
import { useAuthStore } from "@/lib/storeZustand";
import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";
import { Separator } from "../ui/separator";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { User } from "@/Types/User";
import { AxiosError } from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { LoginResponse } from "@/Types/ResponseType";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";
import Image from "next/image";
import { ButtonWithLoadingState } from "../ui/ButtonWithLoadingState";
import { useLoginPage } from "@/hooks/useLoginPage";
export const Login = (props: {}) => {
  const { form, onSubmit, loginUserMutation } = useLoginPage();
  return (
    <Card className="m-2 w-[80vw] max-w-[500px] min-w-[300px] shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="space-y-1">Login with Email</CardTitle>
        <CardDescription>
          Or you can use these 2 platform to get in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6 mb-5">
          <Button variant="outline" className="flex gap-2">
            <AiFillGithub />
            Github
          </Button>
          <Button variant="outline" className="flex gap-2">
            <AiFillGoogleCircle />
            Google
          </Button>
        </div>
        <Separator className="mb-3" />
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      disabled={loginUserMutation.isLoading ? true : false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      disabled={loginUserMutation.isLoading ? true : false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ButtonWithLoadingState
              isLoading={loginUserMutation.isLoading}
              children={"Login"}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/forgot-password" className="text-gray-400">
          Forgot password?
        </Link>
        <Link href="/register" className="text-gray-700">
          Not a User?
        </Link>
      </CardFooter>
    </Card>
  );
};
