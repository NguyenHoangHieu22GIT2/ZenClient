import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Page",
  description: "Create account to become a member",
};
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="">{children}</section>;
}
