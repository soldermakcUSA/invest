import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/components/auth-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "AlphaForge Portal",
  description:
    "Premium investment intelligence portal built with Next.js and Firebase Auth for AI research, portfolio oversight and venture screening.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AlphaForge"
  },
  formatDetection: {
    telephone: false
  },
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  themeColor: "#06101b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
          <defs>
            <filter id="white-to-alpha" colorInterpolationFilters="sRGB">
              <feColorMatrix
                in="SourceGraphic"
                result="alphaMask"
                type="matrix"
                values="
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  -1 -1 -1 0 3
                "
              />
              <feComponentTransfer in="alphaMask" result="alphaBoost">
                <feFuncA type="gamma" amplitude="1.4" exponent="1.8" offset="-0.08" />
              </feComponentTransfer>
              <feComposite in="SourceGraphic" in2="alphaBoost" operator="in" />
            </filter>
            <filter id="black-to-alpha" colorInterpolationFilters="sRGB">
              <feColorMatrix in="SourceGraphic" type="luminanceToAlpha" result="alphaMask" />
              <feComponentTransfer in="alphaMask" result="alphaBoost">
                <feFuncA type="gamma" amplitude="1.8" exponent="0.78" offset="-0.06" />
              </feComponentTransfer>
              <feComposite in="SourceGraphic" in2="alphaBoost" operator="in" />
            </filter>
          </defs>
        </svg>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
