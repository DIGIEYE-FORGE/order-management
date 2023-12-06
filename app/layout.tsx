import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/sessionProvider";
import { authOptions } from "@/lib/authOptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Order Management System",
  description: "order management system",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
