import { getAllMarkers } from "@repo/db";

export async function GET() {
  return Response.json(await getAllMarkers());
}
