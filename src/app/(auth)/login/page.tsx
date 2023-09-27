import { Login } from "@/components/Authentication/Login";
import { Layout } from "@/components/Layout/Layout";
import { useCheckAuthInAuthenPage } from "@/hooks/useCheckAuthInAuthenPage";
import { useAuthStore } from "@/lib/storeZustand";
import { useRouter } from "next/navigation";
export default async function LoginPage(props: {}) {
  return (
    <div className="h-screen flex justify-center items-center">
      <Login />
    </div>
  );
}
