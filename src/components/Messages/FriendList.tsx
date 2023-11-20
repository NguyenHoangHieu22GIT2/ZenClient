import React from "react";
import { AvatarHoverCard } from "../ui/AvatarHoverCard";
import { ScrollArea } from "../ui/scroll-area";
import { ztChatSystem } from "@/Types/ChatSystem";
import { ConversationId, ztConversation } from "@/Types/Conversation";
import { useUserStore } from "@/lib/useUserStore";
import { cn } from "@/lib/utils";

type props = {
  friendList: ztConversation[];
  onJoinChatRoom: (convoId: ConversationId) => void;
};

export const FriendList = (props: props) => {
  const userId = useUserStore((state) => state.user._id);
  return (
    <div className="h-full bg-muted ">
      {/* For Phones */}
      <div className="overflow-x-auto  flex gap-3  md:hidden w-full">
        <section className="w-[500px] cursor-pointer hover:bg-white/40 p-2 rounded-sm transition">
          <header>
            <AvatarHoverCard
              username="asdasd"
              avatarUrl="/avatar.jpeg"
              yearOfJoined={4}
            />
          </header>
          <main>
            <h1 className="font-bold">Kyle Asuli</h1>
            <p className="text-muted-foreground text-sm">
              Online 4 minutes ago.
            </p>
          </main>
        </section>
        <section className=" cursor-pointer hover:bg-white/40 p-2 rounded-sm transition">
          <header>
            <AvatarHoverCard
              username="asdasd"
              avatarUrl="/avatar.jpeg"
              yearOfJoined={4}
            />
          </header>
          <main>
            <h1 className="font-bold">Kyle Asuli</h1>
            <p className="text-muted-foreground text-sm">
              Online 4 minutes ago.
            </p>
          </main>
        </section>
        <section className=" cursor-pointer hover:bg-white/40 p-2 rounded-sm transition">
          <header>
            <AvatarHoverCard
              username="asdasd"
              avatarUrl="/avatar.jpeg"
              yearOfJoined={4}
            />
          </header>
          <main>
            <h1 className="font-bold">Kyle Asuli</h1>
            <p className="text-muted-foreground text-sm">
              Online 4 minutes ago.
            </p>
          </main>
        </section>
        <section className=" cursor-pointer hover:bg-white/40 p-2 rounded-sm transition">
          <header>
            <AvatarHoverCard
              username="asdasd"
              avatarUrl="/avatar.jpeg"
              yearOfJoined={4}
            />
          </header>
          <main>
            <h1 className="font-bold">Kyle Asuli</h1>
            <p className="text-muted-foreground text-sm">
              Online 4 minutes ago.
            </p>
          </main>
        </section>
        <section className=" cursor-pointer hover:bg-white/40 p-2 rounded-sm transition">
          <header>
            <AvatarHoverCard
              username="asdasd"
              avatarUrl="/avatar.jpeg"
              yearOfJoined={4}
            />
          </header>
          <main>
            <h1 className="font-bold">Kyle Asuli</h1>
            <p className="text-muted-foreground text-sm">
              Online 4 minutes ago.
            </p>
          </main>
        </section>
        <section className=" cursor-pointer hover:bg-white/40 p-2 rounded-sm transition">
          <header>
            <AvatarHoverCard
              username="asdasd"
              avatarUrl="/avatar.jpeg"
              yearOfJoined={4}
            />
          </header>
          <main>
            <h1 className="font-bold">Kyle Asuli</h1>
            <p className="text-muted-foreground text-sm">
              Online 4 minutes ago.
            </p>
          </main>
        </section>
        <section className=" cursor-pointer hover:bg-white/40 p-2 rounded-sm transition">
          <header>
            <AvatarHoverCard
              username="asdasd"
              avatarUrl="/avatar.jpeg"
              yearOfJoined={4}
            />
          </header>
          <main>
            <h1 className="font-bold">Kyle Asuli</h1>
            <p className="text-muted-foreground text-sm">
              Online 4 minutes ago.
            </p>
          </main>
        </section>
        <section className=" cursor-pointer hover:bg-white/40 p-2 rounded-sm transition">
          <header>
            <AvatarHoverCard
              username="asdasd"
              avatarUrl="/avatar.jpeg"
              yearOfJoined={4}
            />
          </header>
          <main>
            <h1 className="font-bold">Kyle Asuli</h1>
            <p className="text-muted-foreground text-sm">
              Online 4 minutes ago.
            </p>
          </main>
        </section>
        <section className=" cursor-pointer hover:bg-white/40 p-2 rounded-sm transition">
          <header>
            <AvatarHoverCard
              username="asdasd"
              avatarUrl="/avatar.jpeg"
              yearOfJoined={4}
            />
          </header>
          <main>
            <h1 className="font-bold">Kyle Asuli</h1>
            <p className="text-muted-foreground text-sm">
              Online 4 minutes ago.
            </p>
          </main>
        </section>
      </div>
      {/* For Pc */}
      <ScrollArea className="h-full md:block hidden">
        <div className="flex md:flex-col">
          {props.friendList.map((convo) => {
            const friend =
              convo.userIds[0]._id === userId
                ? convo.userIds[1]
                : convo.userIds[0];
            return (
              <section
                onClick={props.onJoinChatRoom.bind(this, convo._id)}
                key={convo._id}
                className={cn(
                  "flex gap-2 cursor-pointer hover:bg-white/40 p-2 rounded-sm transition",
                  convo.notificationForWho === userId
                    ? "font-bold"
                    : "font-light"
                )}
              >
                <header>
                  <AvatarHoverCard
                    username="asdasd"
                    avatarUrl={friend.avatar}
                    yearOfJoined={4}
                  />
                </header>
                <main>
                  <h1 className="font-bold">{friend.username}</h1>
                  <p className="text-muted-foreground text-sm">
                    Online 4 minutes ago.
                  </p>
                </main>
              </section>
            );
          })}
          {/* <section className="flex gap-2 cursor-pointer hover:bg-white/40 p-2 rounded-sm transition">
            <header>
              <AvatarHoverCard
                username="asdasd"
                avatarUrl="/avatar.jpeg"
                yearOfJoined={4}
              />
            </header>
            <main>
              <h1 className="font-bold">Kyle Asuli</h1>
              <p className="text-muted-foreground text-sm">
                Online 4 minutes ago.
              </p>
            </main>
          </section> */}
        </div>
      </ScrollArea>
    </div>
  );
};
