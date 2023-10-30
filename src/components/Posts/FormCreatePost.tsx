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
import { userStore } from "@/lib/storeZustand";

type props = {
  user: userStore;
};

export function FormCreatePost(props: props) {
  const {
    isLoading,
    uploadFileButton,
    uploadFileElement,
    createPost,
    form,
    user,
  } = useFormCreatePost();

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
                    placeholder={`${props.user.username}, How do you feel? ☺️`}
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
