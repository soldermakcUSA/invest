import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Meridiem Capital",
  description: "Investment platform scaffold built with Next.js, Supabase, Stripe and Heleket."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body
        style={{
          fontFamily: "var(--font-body)"
        }}
      >
        <div
          className="min-h-screen"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(221, 209, 194, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(221, 209, 194, 0.12) 1px, transparent 1px)",
            backgroundSize: "72px 72px"
          }}
        >
          <style>{`
            h1, h2, h3, h4, .font-display {
              font-family: var(--font-display), serif;
            }
          `}</style>
          {children}
        </div>
      </body>
    </html>
  );
}
