import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Groups",
  description: "Places where you belong",
};
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
