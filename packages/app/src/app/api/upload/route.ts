import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";
import { exec, spawn } from "child_process";
import { createMarker, uploadMarker, uploadModel } from "@repo/db";

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const name = data.get("name") as string;
  const marker = data.get("marker") as File;
  const model = data.get("model") as File;

  if (!name || !marker || !model) {
    return new Response("Missing required fields", { status: 400 });
  }

  try {
    await fs.stat("public/uploads");
  } catch (e) {
    await fs.mkdir("public/uploads");
  }

  const markerPath = `public/uploads/${name}.zpt`;
  const modelPath = `public/uploads/${name}.glb`;

  try {
    await Promise.all([
      fs.writeFile(markerPath, Buffer.from(await marker.arrayBuffer())),
      fs.writeFile(modelPath, Buffer.from(await model.arrayBuffer())),
    ]);

    const [dbMarker, dbModel] = await Promise.all([
      uploadMarker({ name, path: markerPath }),
      uploadModel({ name, path: modelPath }),
    ]);
    await createMarker({ name, marker: dbMarker, model: dbModel });
  } catch (e) {
    return new Response("Failed to save files", { status: 500 });
  }

  return new Response("Uploaded successfully", { status: 200 });
}
