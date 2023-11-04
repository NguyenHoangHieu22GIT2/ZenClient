import { Layout } from "@/components/Layout/Layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Group ",
  description: "Create group with your interests!",
};
export default function CreateGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
