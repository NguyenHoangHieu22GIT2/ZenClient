"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormCreatePost } from "@/hooks/useFormCreatePost";
import { GroupId } from "@/Types/Group";
import { useEffect } from "react";
import { socket } from "@/lib/socket";

type props = {
  groupId?: GroupId;
};

export function FormCreatePost(props: props) {
  const { isLoading, uploadFileButton, uploadFileElement, createPost, form } =
    useFormCreatePost(props.groupId);
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createPost)}>
          <FormField
            control={form.control}
            name="postHeading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heading</FormLabel>
                <FormControl>
                  <Input
                    placeholder={`How do you feel? ☺️`}
                    {...field}
                    disabled={isLoading ? true : false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postBody"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paragraph</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more"
                    {...field}
                    disabled={isLoading ? true : false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button onClick={form.handleSubmit(createPost)} className="my-5 mr-5 ">
        Post
      </Button>
      {uploadFileButton}
      <div className="">{uploadFileElement}</div>
    </>
  );
}
