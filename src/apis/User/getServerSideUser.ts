import { zUserMinimalData, ztUserMinimalData } from "@/Types/User";
import { api } from "@/lib/axios.api";
import { Bearer } from "@/utils/Bearer";

export default async function getServerSideUser(
  jwtToken: string,
  userId: string,
) {
  // `http://localhost:3001/auth/validate-jwt-token`, {
  const isAuthenticated = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}auth/validate-jwt-token`,
    { headers: { Authorization: Bearer(jwtToken + "+" + userId) } },
  );

  const user = await isAuthenticated.json();
  return { user };
}
