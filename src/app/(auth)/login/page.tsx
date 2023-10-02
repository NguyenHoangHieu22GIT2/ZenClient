import { Login } from "@/components/Authentication/Login";

export default async function LoginPage(props: {}) {
  return (
    <div className="h-screen flex justify-center items-center">
      <Login />
    </div>
  );
}
