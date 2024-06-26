import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist, StaleWhileRevalidate } from "serwist";
import { Markers } from "@/lib/MarkersCaching";
import { Fishs, Markers as MarkersType } from "@/types";
import { bucket } from "@repo/db/env";

// This file is the service worker entrypoint

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const revision = process.env.NEXT_PUBLIC_APP_VERSION;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      matcher: /.*/i,
      handler: new StaleWhileRevalidate(),
    },
  ],
});

self.addEventListener("install", async (event) => {
  const urls = [
    "/",
    "/app",
    "/viewer",
    "/map",
    "/fishs",
    "/api/markers",
    "/api/fish",
    "/api/files/uploads/targets.mind",
  ];

  const markers: MarkersType = await fetch("/api/markers").then((res) =>
    res.json(),
  );

  urls.push(
    ...markers.reduce((acc, marker) => {
      acc.push(`/api/files/${marker.model.path}`);
      acc.push(`/api/files/${marker.preview.path}`);
      acc.push(`/api/fish/${marker.id}`);
      return acc;
    }, [] as string[]),
  );

  console.log("Precaching", urls);

  serwist.addToPrecacheList(urls.map((url) => ({ url, revision })));

  serwist.handleInstall(event);
});

serwist.addEventListeners();
