import { NextRequest, NextResponse } from "next/server";
import { read } from "@repo/db";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  const blob = await read(params.path.join("/"));

  const r = /\.(png|jpg|jpeg)/g;
  const file = params.path.at(-1)!;

  return new NextResponse(blob, {
    headers: {
      "Content-Type": r.test(file) ? "image/jpeg" : "text/plain",
    },
  });
}
