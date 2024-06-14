import { createMarker, uploadMarker, uploadModel, write } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { compile } from "@/lib/mind";

interface TFile {
  fieldName: string;
  originalFilename: string;
  path: string;
  headers: Headers;
  size: number;
  name: string;
  type: string;
}

interface UploadRequest {
  name: string;
  marker: TFile;
  model: TFile;
}

export async function POST(req: NextRequest) {
  const fd = await req.formData();
  const name = fd.get("name") as string;
  const marker = fd.get("marker") as File;
  const model = fd.get("model") as File;

  const markerPath = `uploads/${Date.now()}-${name}${path.extname(marker.name)}`;
  const modelPath = `uploads/${Date.now()}-${name}.glb`;

  try {
    const [markerUrl, modelUrl] = await Promise.all([
      write({
        url: markerPath,
        content: Buffer.from(await marker.arrayBuffer()),
      }),
      write({
        url: modelPath,
        content: Buffer.from(await model.arrayBuffer()),
      }),
    ]);

    const [dbMarker, dbModel] = await Promise.all([
      uploadMarker({ name, path: markerUrl }),
      uploadModel({ name, path: modelUrl }),
    ]);
    await createMarker({
      name,
      marker: dbMarker,
      model: dbModel,
    });
  } catch (e) {
    console.error(e);
    return new NextResponse("Failed to save files", { status: 500 });
  }

  await compile();

  return new NextResponse("Files saved", { status: 200 });
}
