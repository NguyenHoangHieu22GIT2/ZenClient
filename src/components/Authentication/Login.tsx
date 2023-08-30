import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Inder } from "next/font/google";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Heading } from "../ui/Heading";
import Link from "next/link";
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";
import { Separator } from "../ui/separator";
import { SeparatorVertical } from "lucide-react";

export const Login = (props: {}) => {
  const userSchema = z.object({
    email: z
      .string({
        required_error: "email is required",
        invalid_type_error: "Please type out Letters",
      })
      .email({ message: "It should be an email" }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "The password should have at least 1 lowercase, 1 uppercase, 1 number, 1 symbol and at least 5 characters",
        }
      ),
  });

  const form = useForm<LoginUser>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // console.log(form.formState.errors);

  function onSubmit(values: LoginUser) {
    console.log(values);
  }

  type LoginUser = z.infer<typeof userSchema>;

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
                    <Input placeholder="Email" {...field} />
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
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
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
