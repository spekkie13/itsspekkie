import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { LocaleProvider } from "@/lib/locale-context";

export const metadata: Metadata = {
  title: "itsspekkie — Streamer & Content Creator",
  description:
    "Dutch Twitch & YouTube streamer. Mostly Clash, sometimes chaos. Live around 20:00 CET.",
  openGraph: {
    title: "itsspekkie",
    description: "Dutch Twitch & YouTube streamer.",
    url: "https://itsspekkie.com",
    siteName: "itsspekkie",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@CSpekkie",
    creator: "@CSpekkie",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LocaleProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
