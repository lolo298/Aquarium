import { PrismaClient } from "@prisma/client";
import { connect } from "http2";

const client = new PrismaClient();

export async function getAllMarkers() {
  return client.marker.findMany({ include: { marker: true, model: true, preview: true } });
}

export async function uploadMarker({ name, path }: { name: string; path: string }) {
  if (await client.file.findUnique({ where: { path } })) {
    throw new Error("File already exists");
  }
  return client.file.create({
    data: {
      name,
      path,
      type: "MARKER",
    },
  });
}

export async function uploadModel({ name, path }: { name: string; path: string }) {
  if (await client.file.findUnique({ where: { path } })) {
    throw new Error("File already exists");
  }
  return client.file.create({
    data: {
      name,
      path,
      type: "MODEL",
    },
  });
}

export async function uploadPreview({ name, path }: { name: string; path: string }) {
  if (await client.file.findUnique({ where: { path } })) {
    throw new Error("File already exists");
  }
  console.log("uploadPreview", name, path);
  return client.file.create({
    data: {
      name,
      path,
      type: "PREVIEW",
    },
  });
}

export async function createMarker({
  name,
  marker,
  model,
  preview,
}: {
  name: string;
  marker: Awaited<ReturnType<typeof uploadMarker>>;
  model: Awaited<ReturnType<typeof uploadModel>>;
  preview: Awaited<ReturnType<typeof uploadPreview>>;
}) {
  return client.marker.create({
    data: {
      name,
      marker: {
        connect: { id: marker.id },
      },
      model: {
        connect: { id: model.id },
      },
      preview: {
        connect: { id: preview.id },
      },
    },
  });
}
