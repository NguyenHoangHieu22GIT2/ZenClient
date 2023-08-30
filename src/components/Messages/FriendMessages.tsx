import React from "react";
import { AvatarHoverCard } from "../ui/AvatarHoverCard";
import { Button } from "../ui/button";
import { AiOutlinePhone, AiOutlineSend } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { Input } from "../ui/input";
export function FriendMessages() {
  return (
    <div className="flex flex-col gap-2">
      <header className="flex p-2 bg-muted justify-between items-center  [&>*]:flex [&>*]:items-center [&>*]:gap-2">
        <div>
          <AvatarHoverCard
            username="asdasd"
            avatarUrl="/avatar.jpeg"
            yearOfJoined={4}
          />
          <h1>ShadCn</h1>
        </div>
        <div>
          <Button variant={"outline"}>
            <AiOutlinePhone />
          </Button>
          <Button variant={"outline"}>
            <BsCameraVideo />
          </Button>
          <Button variant={"outline"}>
            <CiSettings />
          </Button>
        </div>
      </header>
      <main className="bg-muted p-4 h-full self-stretch">
        <div className="[&>:not(first-child)]:mt-5 ">
          <div>
            <h1 className="inline-block mb-1 bg-blue-400 rounded-full  px-5 py-2">
              Hello Dude
            </h1>
            <p className="text-muted-foreground">20:11AM</p>
          </div>
          <div className="float-right">
            <h1 className="inline-block mb-1 bg-green-400 rounded-full  px-5 py-2">
              Hello Dude
            </h1>
            <p className="text-muted-foreground">20:11AM</p>
          </div>
        </div>
      </main>
      <footer className="flex gap-2">
        <Input placeholder="Write something to them!" />
        <Button><AiOutlineSend /></Button>
      </footer>
    </div>
  );
}
