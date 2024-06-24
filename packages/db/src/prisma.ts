import { Prisma, PrismaClient } from "@prisma/client";

/*
 * Create a prisma client to interact with the database
 */

function createClient() {
  return new PrismaClient();
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof createClient>;
} & typeof global;

// create a singleton prisma client
const client = globalThis.prismaGlobal ?? createClient();
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = client;

export async function getAllMarkers() {
  return client.marker.findMany({
    include: { marker: true, model: true, preview: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function uploadMarker({ name, path }: { name: string; path: string }) {
  return client.file.create({
    data: {
      name,
      path,
      type: "MARKER",
    },
  });
}

export async function uploadModel({ name, path }: { name: string; path: string }) {
  return client.file.create({
    data: {
      name,
      path,
      type: "MODEL",
    },
  });
}

export async function uploadPreview({ name, path }: { name: string; path: string }) {
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

type markerInclude = Omit<Prisma.MarkerInclude, "Entity" | "_count">;

export async function getMarker(id: string, include: markerInclude) {
  return client.marker.findUnique({
    where: { id },
    include: include,
  });
}

export async function deleteMarker(id: string) {
  return await client.marker.delete({ where: { id: id } });
}

export async function getAllFishs() {
  return client.entity.findMany({
    orderBy: { createdAt: "asc" },
  });
}

export async function getFishData(id: string, include: Prisma.EntityInclude = {}) {
  const entity = await client.entity.findUnique({
    where: {
      MarkerId: id,
    },
    include: { ...include },
  });

  if (entity) {
    return entity;
  }

  await client.entity.create({
    data: {
      long: 0,
      zone: "",
      Marker: {
        connect: { id },
      },
    },
  });

  return await getFishData(id, include);
}
