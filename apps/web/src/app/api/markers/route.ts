import { NextRequest, NextResponse } from "next/server";
import { getAllMarkers } from "@repo/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return NextResponse.json(await getAllMarkers());
}
