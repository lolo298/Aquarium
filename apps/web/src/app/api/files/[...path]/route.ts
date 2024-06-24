import { NextRequest, NextResponse } from "next/server";
import { read } from "@repo/db";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  console.log("request file at path ", params.path.join("/"));
  const blob = await read(params.path.join("/"));

  const r = /\.(png|jpg|jpeg)/g;
  const file = params.path.at(-1)!;

  return new NextResponse(blob, {
    headers: {
      "Content-Type": r.test(file) ? "image/jpeg" : "text/plain",
    },
  });
}
