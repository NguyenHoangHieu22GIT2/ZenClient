import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Friends",
  description: "Find all your friends!",
};
export default function FriendsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
