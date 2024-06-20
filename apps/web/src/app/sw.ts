import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist, StaleWhileRevalidate } from "serwist";
import { Markers } from "@/lib/MarkersCaching";

// This file is the service worker entrypoint

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      matcher: /api\/markers/i,
      handler: new Markers(),
    },
    {
      matcher: /.*/i,
      handler: new StaleWhileRevalidate(),
    },
  ],
});

serwist.addEventListeners();
