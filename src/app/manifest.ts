import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AlphaForge Mobile",
    short_name: "AlphaForge",
    description: "Mobile AlphaForge intelligence workspace for signals, portfolio monitoring and venture review.",
    start_url: "/mobile",
    display: "standalone",
    background_color: "#06101b",
    theme_color: "#06101b",
    icons: [
      {
        src: "/brand/header-logo.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/brand/icon-sheet-light.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
