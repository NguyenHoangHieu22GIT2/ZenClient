import { useUserStore } from "@/lib/useUserStore";
import { ztUser } from "@/Types/User";
import { useEffect, useState } from "react";

export function useUserFromZustandClient() {
  const userFromZustand = useUserStore(
    (state) => state
  ) as unknown as Partial<ztUser>;
  const [user, setUser] = useState<Partial<ztUser>>();

  useEffect(() => {
    setUser(userFromZustand);
  }, []);
  return {
    user,
  };
}
