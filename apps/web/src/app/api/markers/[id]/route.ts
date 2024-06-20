import { NextRequest, NextResponse } from "next/server";

import { getMarker, deleteMarker, unlink } from "@repo/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  try {
    const marker = await getMarker(id, {
      marker: true,
      model: true,
      preview: true,
    });

    const paths = [
      marker?.marker?.path,
      marker?.model?.path,
      marker?.preview?.path,
    ];
    // Delete the files from the storage bucket
    await unlink(paths as string[]);

    await deleteMarker(id);
  } catch (error) {
    console.error(error);
    return new NextResponse(error as any, { status: 500 });
  }
  return new NextResponse(null, { status: 204 });
}
