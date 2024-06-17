import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheFirst, Serwist } from "serwist";
import { Markers } from "@/lib/MarkersCaching";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
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
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: /api\/markers/i,
      handler: new Markers(),
    },
    {
      matcher: /.*/i,
      handler: new CacheFirst(),
    },
  ],
});

serwist.addEventListeners();
