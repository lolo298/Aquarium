import type { getAllMarkers } from "@repo/db";
export type Markers = Awaited<ReturnType<typeof getAllMarkers>>;
