import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import type { Markers } from "@/types";
import { draggedFishAtom, markersDataAtom } from "@/lib/atoms";
import { useAtom } from "jotai/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);

export default function MarkersPins() {
  const [_, setDraggedMarker] = useAtom(draggedFishAtom);
  const [markersData, setMarkersData] = useAtom(markersDataAtom);
  const query = useQuery<Markers>({
    queryKey: ["markers"],
    queryFn: async () => await fetch("/api/markers").then((res) => res.json()),
  });

  const data = useMemo(
    () =>
      query.data?.map((marker) => {
        return {
          ...(markersData.find((m) => m.id === marker.id) ?? {}),
          ...marker,
        };
      }) ?? [],
    [query.data, markersData],
  );

  return (
    <div className="absolute inset-x-0 bottom-0 z-[500] m-2 flex h-1/5 touch-none items-center justify-start gap-4 overflow-x-auto rounded-lg bg-slate-200/90 p-4">
      {data.map((marker) => {
        if (!marker.zone) {
          return (
            <div
              key={marker.id}
              className="mr-4 flex flex-col items-center"
              onTouchStart={(e) => {
                console.log("drag start");
                setDraggedMarker(marker);
              }}
              draggable="true"
            >
              <Image
                src={marker.preview!.path}
                alt={marker.name}
                width={50}
                height={50}
                className="rounded-lg"
              />
              <p className="text-xs">{marker.name}</p>
            </div>
          );
        }
      })}
    </div>
  );
}
