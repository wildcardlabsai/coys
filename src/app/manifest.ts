import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "COYS | Your Spurs Matchday Companion",
    short_name: "COYS",
    description:
      "The ultimate Tottenham Hotspur matchday companion. Away day guides, pub recommendations, ground info, and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#F3F4F6",
    theme_color: "#132257",
    orientation: "portrait-primary",
    categories: ["sports", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
