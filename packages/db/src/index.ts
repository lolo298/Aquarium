import { PrismaClient } from "@prisma/client";
import { connect } from "http2";

const client = new PrismaClient();

export async function getAllMarkers() {
  return client.marker.findMany({ include: { marker: true, model: true } });
}

export async function uploadMarker({ name, path }: { name: string; path: string }) {
  return client.file.create({
    data: {
      name,
      path,
      type: "MODEL",
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

export async function createMarker({
  name,
  marker,
  model,
}: {
  name: string;
  marker: Awaited<ReturnType<typeof uploadMarker>>;
  model: Awaited<ReturnType<typeof uploadModel>>;
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
    },
  });
}
