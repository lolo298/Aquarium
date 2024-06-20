import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import type { Markers } from "@/types";
import { draggedFishAtom, markersDataAtom } from "@/lib/atoms";
import { useAtom } from "jotai/react";
import { useMemo } from "react";

export default function MarkersPins() {
  const [_, setDraggedMarker] = useAtom(draggedFishAtom);
  const [markersData, setMarkersData] = useAtom(markersDataAtom);

  const query = useQuery<Markers>({
    queryKey: ["markers"],
    queryFn: async () => await fetch("/api/markers").then((res) => res.json()),
  });

  // Merge the dropped markers data with the data from the db
  const data = useMemo(
    () =>
      query.data?.map((marker) => {
        return {
          // Find the data if the fish has been dropped
          ...(markersData.find((m) => m.id === marker.id) ?? {}),
          ...marker,
        };
      }) ?? [],
    [query.data, markersData],
  );

  return (
    <div className="absolute inset-x-0 bottom-0 z-[500] m-2 flex h-1/5 touch-none items-center justify-start gap-4 overflow-x-auto rounded-lg bg-slate-200/90 p-4">
      {data.map((marker) => {
        // Dont show the markers that have been dropped
        if (!marker.zone) {
          return (
            <div
              key={marker.id}
              className="mr-4 flex flex-col items-center"
              onTouchStart={() => {
                setDraggedMarker(marker);
              }}
              draggable="true"
            >
              <Image
                src={marker.preview.path}
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
