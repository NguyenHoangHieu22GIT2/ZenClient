import React, { useCallback, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zUserMinimalData, ztUserMinimalData } from "@/Types/User";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import {
  changeInformationResponse,
  zErrorResponse,
} from "@/Types/ResponseType";
import { ToastAction } from "../ui/toast";
type props = {
  pathServer: string;
  propertyNames: Record<string, string>;
  dto: z.AnyZodObject;
  title: string;
};

export const ChangeInformation = (props: props) => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationKey: [`change-${props.pathServer}`],
    mutationFn: async (data: Record<string, string>) => {
      const dataToSend: Record<string, string> = {};
      for (const key in props.propertyNames) {
        dataToSend[key] = data[key];
      }
      return api
        .patch(props.pathServer, dataToSend, {
          withCredentials: true,
        })
        .then((data) => {
          return data.data;
        })
        .then((user: changeInformationResponse<"success">) => {
          const parsedUser = zUserMinimalData.parse(user);
          if (parsedUser._id) {
            router.replace("/");
            toast({
              title: `Change ${props.title} successfully`,
              action: <ToastAction altText="alright">Alright</ToastAction>,
            });
          }
        })
        .catch((err: changeInformationResponse<"error">) => {
          const parsedError = zErrorResponse.parse(err);
          toast({
            title: parsedError.response.data.error,
            description: parsedError.response.data.message,
            action: <ToastAction altText="alright">Alright</ToastAction>,
          });
        });
    },
  });
  type ChangeInformationType = z.infer<typeof props.dto>;
  const defaultValue: Record<string, string> = {};
  for (const key in props.propertyNames) {
    defaultValue[key] = "";
  }
  const form = useForm<ChangeInformationType>({
    resolver: zodResolver(props.dto),
    defaultValues: defaultValue,
  });
  useEffect(() => {
    form.reset();
  }, []);
  const submit = useCallback((data: ChangeInformationType) => {
    mutate(data);
  }, []);

  return (
    <Card className="p-5 ">
      <CardHeader>
        <div className="hidden">
          {Object.keys(props.propertyNames).toString()}
        </div>
        <CardTitle>Change {props.title}:</CardTitle>
      </CardHeader>
      <div >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            {Object.keys(props.propertyNames).map((property, index) => {
              return (
                <FormField
                  key={index}
                  name={property}
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{property}</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder={property}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              );
            })}

            <Button
              // onClick={submit.bind(this, form.getValues(props.propertyName))}
              className="mt-5"
            >
              Change
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
};
