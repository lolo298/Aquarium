import { getAllMarkers } from "@repo/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getAllMarkers());
}
