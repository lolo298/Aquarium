import { atom } from "jotai";
import { Markers } from "@/types";
import { PathOptions } from "leaflet";

/************* VIEWER *************/
/**
 * The currently viewed fish
 */
export const viewedFishIdAtom = atom<string | null>(null);

/************* MAP *************/
/**
 * The Currently dragged fish
 */
export const draggedFishAtom = atom<Markers[0] | null>(null);

/**
 * The zones configuration
 */
export const zonesConfigAtom = atom<
  Record<string, { options: PathOptions; childs?: React.ReactNode[] }>
>({
  embruns: { options: { color: "purple" } },
  nurse: { options: { color: "purple" } },
  brume: { options: { color: "purple" } },
  deep: { options: { color: "purple" } },
});

/**
 * The touch position
 */
export const touchPositionAtom = atom<[number, number]>([0, 0]);

/**
 * The active drop zone
 */
export const dropZoneAtom = atom<{
  polygon: L.Polygon | null;
  zone: string;
}>({ polygon: null, zone: "" });

/**
 * The dropped markers data
 */
export const markersDataAtom = atom<
  {
    id: string;
    polygon: L.Polygon | null;
    zone: string;
  }[]
>([]);
