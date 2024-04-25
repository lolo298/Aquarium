import type { Express, Request, Response, Application } from "express";
import express from "express";
import dotenv from "dotenv";
import {
  createMarker,
  deleteMarker,
  getAllMarkers,
  getMarker,
  uploadMarker,
  uploadModel,
  uploadPreview,
} from "@repo/db";
import os from "os";
import formData from "express-form-data";
import { init, unlink, write } from "./files";
import path from "path";
import fs from "fs/promises";
import cors from "cors";
import { supabase } from "./supabase";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());

/**
 * Options are the same as multiparty takes.
 * But there is a new option "autoClean" to clean all files in "uploadDir" folder after the response.
 * By default, it is "false".
 */
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

// parse data with connect-multiparty.
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());

// union the body and the files
app.use(formData.union());

app.get("/api/markers", async (_, res: Response) => {
  res.json(await getAllMarkers());
});

app.delete("/api/markers/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const marker = await getMarker(id);

    const paths = [marker?.marker?.path, marker?.preview?.path, marker?.model?.path];

    if (paths.some((path) => path === undefined)) {
      return res.status(404).send("File not found");
    }

    await unlink(paths as string[]);

    await deleteMarker(id);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error as any);
  }
  return res.status(204).send(null);
});

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

app.post("/api/upload", async (req: Request, res: Response) => {
  const { name, marker, model, preview } = req.body as UploadRequest;

  const previewPath = `uploads/${Date.now()}-${name}${path.extname(preview.name)}`;
  const markerPath = `uploads/${Date.now()}-${name}.zpt`;
  const modelPath = `uploads/${Date.now()}-${name}.glb`;

  try {
    const [markerUrl, modelUrl, previewUrl] = await Promise.all([
      write({
        url: markerPath,
        content: Buffer.from((await fs.readFile(marker.path)).buffer),
      }),
      write({
        url: modelPath,
        content: Buffer.from((await fs.readFile(model.path)).buffer),
      }),
      write({
        url: previewPath,
        content: Buffer.from((await fs.readFile(preview.path)).buffer),
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
    return res.send("Failed to save files").status(500);
  }

  return res.send("Files saved").status(200);
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
