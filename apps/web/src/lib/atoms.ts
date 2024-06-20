import { atom } from "jotai";
import { Markers } from "@/types";
import { PathOptions } from "leaflet";

export const fishAtom = atom<Markers>([]);
fishAtom.onMount = (setFish) => {
  fetch("/api/markers")
    .then((res) => res.json())
    .then((data) => {
      setFish(data);
    });
};

export const draggedFishAtom = atom<Markers[0] | null>(null);
export const zonesConfigAtom = atom<
  Record<string, { options: PathOptions; childs?: React.ReactNode[] }>
>({
  embruns: { options: { color: "purple" } },
  nurse: { options: { color: "purple" } },
  brume: { options: { color: "purple" } },
  deep: { options: { color: "purple" } },
});
export const touchPositionAtom = atom<[number, number]>([0, 0]);
export const dropZoneAtom = atom<L.Polygon | null>(null);
export const markersDataAtom = atom<
  {
    id: string;
    zone: L.Polygon | null;
  }[]
>([]);
