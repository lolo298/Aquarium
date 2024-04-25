import { NextRequest } from "next/server";
import fs from "fs/promises";
import { deleteMarker, getMarker } from "@repo/db";

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  console.log("DELETE", id);
  try {
    const marker = await getMarker(id);

    const paths = [
      marker?.marker?.path,
      marker?.preview?.path,
      marker?.model?.path,
    ];

    if (paths.some((path) => path === undefined)) {
      throw new Error("File not found");
    }

    await Promise.all([
      ...paths.map((path) => fs.unlink(`public${path as string}`)),
      deleteMarker(id),
    ]);
  } catch (error) {
    console.error(error);
    return new Response(error as any, { status: 500 });
  }
  return new Response(null, { status: 204 });
}
