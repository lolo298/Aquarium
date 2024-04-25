import { NextRequest } from "next/server";
import path from "path";
import { write, init } from "@/lib/files";
import {
  createMarker,
  uploadMarker,
  uploadModel,
  uploadPreview,
} from "@repo/db";

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const name = data.get("name") as string;
  const marker = data.get("marker") as File;
  const model = data.get("model") as File;
  const preview = data.get("preview") as File;

  if (!name || !marker || !model || !preview) {
    return new Response("Missing required fields", { status: 400 });
  }

  await init();

  const previewPath = `uploads/${Date.now()}-${name}${path.extname(preview.name)}`;
  const markerPath = `uploads/${Date.now()}-${name}.zpt`;
  const modelPath = `uploads/${Date.now()}-${name}.glb`;

  try {
    const [markerUrl, modelUrl, previewUrl] = await Promise.all([
      write({
        url: markerPath,
        content: Buffer.from(await marker.arrayBuffer()),
      }),
      write({
        url: modelPath,
        content: Buffer.from(await model.arrayBuffer()),
      }),
      write({
        url: previewPath,
        content: Buffer.from(await preview.arrayBuffer()),
      }),
    ]);

    const [dbMarker, dbModel, dbPreview] = await Promise.all([
      uploadMarker({ name, path: markerUrl }),
      uploadModel({ name, path: modelUrl }),
      uploadPreview({ name, path: previewUrl }),
    ]);
    await createMarker({
      name,
      marker: dbMarker,
      model: dbModel,
      preview: dbPreview,
    });
  } catch (e) {
    console.error(e);
    return new Response("Failed to save files", { status: 500 });
  }

  return new Response("Uploaded successfully", { status: 200 });
}
