import { NextRequest, NextResponse } from "next/server";
import { getFishData } from "@repo/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const searchParams = req.nextUrl.searchParams;
  const includeMarker = searchParams.get("includeMarker") === "true";

  return NextResponse.json(
    await getFishData(params.id, { Marker: includeMarker, names: true }),
  );
}
