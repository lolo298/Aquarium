import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    short_name: "Aquarium ARcade",
    name: "Aquarium ARcade",
    description:
      "Aquarium ARcade is a fun and educational augmented reality game that lets you create your own virtual aquarium and learn about marine life.",
    id: "com.aquariumarcade",
    protocol_handlers: [
      {
        protocol: "web+aquariumarcade",
        url: "/app?target=%s",
      },
    ],
    intent_filters: {
      scope_url_scheme: "https",
      scope_url_host: process.env.COOLIFY_URL ?? "localhost",
      scope_url_path: "/",
    },
    capture_links: "existing-client-navigate",
    icons: [
      {
        src: "images/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "images/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "images/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "images/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "images/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "images/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "images/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "images/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "dorade.jpg",
        sizes: "945x945",
        type: "image/jpeg",
        form_factor: "wide",
      },
      {
        src: "dorade.jpg",
        sizes: "945x945",
        type: "image/jpeg",
      },
    ],
    start_url: "/app",
    scope: "/",
    display: "fullscreen",
    theme_color: "#000000",
    background_color: "#ffffff",
    orientation: "portrait",
  });
}
