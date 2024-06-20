import {
  createMarker,
  uploadMarker,
  uploadModel,
  uploadPreview,
  write,
} from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
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
  preview: TFile;
}

let abortController = new AbortController();

export async function POST(req: NextRequest) {
  // abort ongoing compilation
  abortController.abort();
  abortController = new AbortController();

  const fd = await req.formData();
  const name = fd.get("name") as string;
  const marker = fd.get("marker") as File;
  const model = fd.get("model") as File;
  const preview = fd.get("preview") as File;

  const markerPath = `uploads/markers/${Date.now()}-${name}${path.extname(marker.name)}`;
  const previewPath = `uploads/previews/${Date.now()}-${name}${path.extname(marker.name)}`;
  const modelPath = `uploads/models/${Date.now()}-${name}.glb`;

  try {
    // Save the files to the storage bucket
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

    // Save the files to the database
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
    return new NextResponse("Failed to save files", { status: 500 });
  }
  try {
    // Compile the markers to a single target file
    await compile({ signal: abortController.signal });
  } catch (e) {
    return new NextResponse("Failed to compile", { status: 500 });
  }

  return new NextResponse("Files saved", { status: 200 });
}
