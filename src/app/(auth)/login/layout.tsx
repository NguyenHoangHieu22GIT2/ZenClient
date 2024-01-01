import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page",
  description: "Login To Use all features",
};
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-login-page h-full bg-no-repeat bg-center bg-cover">
      {children}
    </section>
  );
}
