import { TiTick } from "react-icons/ti";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
export function RegisterThirdStep() {
  const router = useRouter();
  function changeToLoginPage() {
    router.replace("/login");
  }
  return (
    <div>
      <div className="flex justify-center text-5xl">
        <div className="bg-green-500 animate-pulse rounded-full">
          <TiTick />
        </div>
      </div>
      <div>
        <h1 className="font-bold">Sign up successfully!</h1>
        <p className="mt-2 mb-5">
          Please go to your email to verify this account.
        </p>
        <Button onClick={changeToLoginPage}>Okay</Button>
      </div>
    </div>
  );
}
