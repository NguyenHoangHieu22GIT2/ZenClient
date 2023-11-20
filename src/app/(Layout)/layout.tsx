import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/Themes/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Layout } from "@/components/Layout/Layout";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zed",
  description: "Social Media Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="modal-root" />
        <Layout>
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
          {children}
          <Toaster />
          {/* </ThemeProvider> */}
        </Layout>
      </body>
    </html>
  );
}
