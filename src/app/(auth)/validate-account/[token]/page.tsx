"use client";
import { api } from "@/lib/axios.api";
import { useMutation } from "@tanstack/react-query";
import { Props } from "next/script";
import { Container } from "@/components/ui/Container";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ValidateAccount(props: { params: { token: string } }) {
  const router = useRouter();
  const { mutate, data, error, isLoading } = useMutation({
    mutationKey: ["validate-account"],
    mutationFn: async (data: { token: string }) => {
      return api
        .patch(process.env.NEXT_PUBLIC_SERVER_AUTH_VALIDATE_ACCOUNT, data)
        .then((data) => data.data);
    },
  });
  useEffect(() => {
    if (props.params.token) {
      mutate({ token: props.params.token });
    }
  }, [props]);
  let message = (
    <CardDescription className="text-gray-200">
      Waiting for our server to check your information!
    </CardDescription>
  );
  if (data) {
    message = (
      <CardDescription className="text-green-500">
        Confirming Successfully, thank you so much!
      </CardDescription>
    );
  } else if (error) {
    message = (
      <CardDescription className="text-red-400">
        something went wrong
      </CardDescription>
    );
  }
  return (
    <Container className="flex justify-center items-center mt-52">
      <Card className="px-16 py-8 shadow-lg">
        <CardHeader>
          <CardTitle>Confirming account!</CardTitle>
        </CardHeader>
        <CardContent>{message}</CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              router.push("/login");
            }}
          >
            Alright
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
}
