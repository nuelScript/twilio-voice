import ToasterProvider from "@/providers/toaster-provider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Syne } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const syne = Syne({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Twilio App",
  description: "Twilio Programmable Voice API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={`${syne.className} antialiased`}>
          <ToasterProvider />
          <Toaster />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
