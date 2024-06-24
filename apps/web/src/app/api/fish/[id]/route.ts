import { NextRequest, NextResponse } from "next/server";
import { getFishData } from "@repo/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return NextResponse.json(await getFishData(params.id, { names: true }));
}
