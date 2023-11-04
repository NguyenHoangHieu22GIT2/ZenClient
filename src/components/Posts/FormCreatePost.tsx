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
import { useUserStore } from "@/lib/useUserStore";

export function FormCreatePost() {
  const { isLoading, uploadFileButton, uploadFileElement, createPost, form } =
    useFormCreatePost();
  const user = useUserStore((state) => state.user);
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
                    placeholder={`${user.username}, How do you feel? ☺️`}
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
