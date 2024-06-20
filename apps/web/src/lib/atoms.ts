import { atom } from "jotai";
import { Markers } from "@/types";
import { PathOptions } from "leaflet";

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
export const dropZoneAtom = atom<L.Polygon | null>(null);

/**
 * The dropped markers data
 */
export const markersDataAtom = atom<
  {
    id: string;
    zone: L.Polygon | null;
  }[]
>([]);
