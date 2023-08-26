import { Layout } from "@/app/_components/Layout/Layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
  description: "See your friend's moments",
};
export default function postsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
