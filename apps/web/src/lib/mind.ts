import { getAllMarkers, write } from "@repo/db";
import { loadImage } from "canvas";
import { OfflineCompiler } from "mind-ar/src/image-target/offline-compiler.js";
import { Capture } from "@/lib/utils";

export async function compile(options?: { signal: AbortSignal }) {
  const capture = new Capture();
  if (options?.signal.aborted) {
    capture.release();
    throw new Error("Aborted");
  }

  options?.signal.addEventListener("abort", () => {
    capture.release();
    throw new Error("Aborted");
  });

  const targetPath = `uploads/targets.mind`;
  const markers = await getAllMarkers();
  console.log("Compiling...", markers);
  const images = await Promise.all(
    markers.map((marker) => loadImage(marker.marker.path)),
  );
  capture.capture((ogLog, val) => {
    ogLog("capturing log", val);
  });
  try {
    const compiler = new OfflineCompiler();
    await compiler.compileImageTargets(images, console.log);
    const buffer = compiler.exportData();
    await write({
      url: targetPath,
      content: buffer,
    });
  } catch (e) {
    console.error(e);
  }

  capture.release();
  console.log("Compiled");
}
