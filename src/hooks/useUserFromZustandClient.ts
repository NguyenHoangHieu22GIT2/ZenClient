import { useAuthStore } from "@/lib/storeZustand";
import { User } from "@/Types/User";
import { useEffect, useState } from "react";

export function useUserFromZustandClient() {
  const userFromZustand = useAuthStore(
    (state) => state
  ) as unknown as Partial<User>;
  const [user, setUser] = useState<Partial<User>>();

  useEffect(() => {
    setUser(userFromZustand);
  }, []);
  return {
    user,
  };
}
