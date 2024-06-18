import { atom } from "jotai";
import { Markers } from "@/types";

export const fishAtom = atom<Markers>([]);
fishAtom.onMount = (setFish) => {
  fetch("/api/markers")
    .then((res) => res.json())
    .then((data) => {
      setFish(data);
    });
};
