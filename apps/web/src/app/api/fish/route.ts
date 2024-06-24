import { NextRequest, NextResponse } from "next/server";
import { getAllFishs } from "@repo/db";

export async function GET(req: NextRequest) {
  return NextResponse.json(await getAllFishs());
}
