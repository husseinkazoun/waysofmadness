import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nader Bahsoun",
  description: "Nader Bahsoun portfolio and print shop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0e0e0e] text-[#ededed] antialiased">
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
