import { useAuthStore } from "@/lib/storeZustand";
import { AvatarHoverCard } from "../ui/AvatarHoverCard";

export function UserAvatarHoverCard() {
  const user = useAuthStore((state) => state);
  //   const cookie = cookies().get("jwtToken")!.value;
  //   console.log(cookie);
  return (
    <AvatarHoverCard
      username={user.username}
      avatarUrl={
        user.access_token
          ? user.avatar
            ? user.avatar
            : "/default-user.jpeg"
          : "/default-user.jpeg"
      }
      // avatarUrl="https://github.com/shadcn.png"
      yearOfJoined={0}
    />
  );
}
