"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { socketConversations } from "@/lib/socket";

export default function Chatbox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const changeInput = useCallback(
    (value: string) => {
      setInput(value);
    },
    [input]
  );

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    socketConversations.emit("sendMessage", {
      message: input,
    });
  }
  useEffect(() => {
    socketConversations.on("sendBackMessage", (data) => {
      setMessages((oldArray) => [...oldArray, data]);
    });
    return () => socketConversations.off("sendBackMessage");
  }, [socket]);
  return (
    <Card className="fixed bottom-0 right-0 border-2 rounded-sm">
      <CardHeader className="border-b-2 h-10 p-2 m-0">
        <CardTitle>A NAME</CardTitle>
      </CardHeader>
      <CardContent className="">
        <ScrollArea className="h-96 pt-4 w-full ">
          {messages.map((message, index) => {
            return (
              <div key={index}>
                <h1 className="inline-block mb-1 bg-blue-400 rounded-full  px-5 py-2">
                  {message.text}
                </h1>
                <p className="text-muted-foreground">20:11AM</p>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={submit} className="flex gap-2">
          <Input
            alt="Type what you want to send a message here"
            placeholder="Type what you want to send a message here"
            onChange={(e) => changeInput(e.target.value)}
          />
          <Button variant={"secondary"}>Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
