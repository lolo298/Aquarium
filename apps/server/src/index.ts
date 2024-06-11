import { loadImage } from "canvas";
import cors from "cors";
import type { Application, Request, Response } from "express";
import express from "express";
import formData from "express-form-data";
import fs from "fs";
import https from "https";
import { OfflineCompiler } from "mind-ar/src/image-target/offline-compiler.js";
import os from "os";
import path from "path";
import {
  createMarker,
  deleteMarker,
  getAllMarkers,
  getMarker,
  uploadMarker,
  uploadModel,
} from "../../../packages/db/src/index";
import { unlink, write } from "./files";
import { Capture } from "./utils";

//For env File

var privateKey = fs.readFileSync("../web/certificates/localhost-key.pem", "utf-8");
var certificate = fs.readFileSync("../web/certificates/localhost.pem", "utf-8");

var credentials = { key: privateKey, cert: certificate };

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

    const paths = [marker?.marker?.path, marker?.model?.path];

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
}

app.post("/api/upload", async (req: Request, res: Response) => {
  const { name, marker, model } = req.body as UploadRequest;

  const markerPath = `uploads/${Date.now()}-${name}${path.extname(marker.name)}`;
  const modelPath = `uploads/${Date.now()}-${name}.glb`;

  try {
    const [markerUrl, modelUrl] = await Promise.all([
      write({
        url: markerPath,
        content: Buffer.from(fs.readFileSync(marker.path).buffer),
      }),
      write({
        url: modelPath,
        content: Buffer.from(fs.readFileSync(model.path).buffer),
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
    return res.send("Failed to save files").status(500);
  }

  await compile();

  return res.send("Files saved").status(200);
});

app.get("/api/compile", async (_, res: Response) => {
  await compile();
  res.send("Compiled");
});

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Server is Fire at https://localhost:${port}`);
});

async function compile() {
  const targetPath = `uploads/targets.mind`;
  const markers = await getAllMarkers();
  console.log("Compiling...", markers);
  const images = await Promise.all(markers.map((marker) => loadImage(marker.marker.path)));
  const capture = new Capture();
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
