import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";
import { exec, spawn } from "child_process";
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

  await initFolders();

  const previewPath = `/uploads/${Date.now()}-${name}${path.extname(preview.name)}`;
  const markerPath = `/uploads/${Date.now()}-${name}.zpt`;
  const modelPath = `/uploads/${Date.now()}-${name}.glb`;

  try {
    await Promise.all([
      fs.writeFile(
        `public${markerPath}`,
        Buffer.from(await marker.arrayBuffer()),
      ),
      fs.writeFile(
        `public${modelPath}`,
        Buffer.from(await model.arrayBuffer()),
      ),
      fs.writeFile(
        `public${previewPath}`,
        Buffer.from(await preview.arrayBuffer()),
      ),
    ]);

    const [dbMarker, dbModel, dbPreview] = await Promise.all([
      uploadMarker({ name, path: markerPath }),
      uploadModel({ name, path: modelPath }),
      uploadPreview({ name, path: previewPath }),
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

async function initFolders() {
  try {
    await fs.stat("public/uploads");
  } catch (e) {
    await fs.mkdir("public/uploads");
  }
}
