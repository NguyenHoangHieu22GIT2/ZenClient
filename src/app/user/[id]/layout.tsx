import { Layout } from "@/components/Layout/Layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Userpage",
  description: "All your information are here",
};
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
