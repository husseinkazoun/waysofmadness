import type { Metadata } from "next";
import { Epilogue, Poppins } from "next/font/google";
import { SquarespaceHeader } from "@/components/squarespace-header";
import { pageImages } from "@/lib/page-images";
import { squarespaceBodyClass } from "@/lib/squarespace-body";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

const heroImage = pageImages["home"]?.[0];

export const metadata: Metadata = {
  title: {
    default: "Nader Bahsoun",
    template: "%s | Nader Bahsoun",
  },
  description:
    "Visual artist and photographer exploring memory, place, and archives through image, film, and installation.",
  openGraph: {
    title: "Nader Bahsoun",
    description:
      "Visual artist and photographer exploring memory, place, and archives through image, film, and installation.",
    type: "website",
    images: heroImage ? [{ url: heroImage }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nader Bahsoun",
    description:
      "Visual artist and photographer exploring memory, place, and archives through image, film, and installation.",
    images: heroImage ? [heroImage] : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${epilogue.variable}`}>
      <body className={squarespaceBodyClass}>
        <div id="siteWrapper" className="clearfix site-wrapper">
          <SquarespaceHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
