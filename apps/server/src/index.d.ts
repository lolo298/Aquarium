declare module "mind-ar/src/image-target/offline-compiler.js" {
  import type { Image } from "canvas";

  export class OfflineCompiler {
    constructor();
    compileImageTargets(images: Image[], callback: () => void);
    exportData(): Uint8Array;
  }
}
