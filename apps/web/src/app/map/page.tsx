"use client";
import dynamic from "next/dynamic";
import MarkersView from "./Markers";
import {
  draggedFishAtom,
  dropZoneAtom,
  markersDataAtom,
  touchPositionAtom,
} from "@/lib/atoms";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useRef } from "react";

const Map = dynamic(() => import("./Map"), { ssr: false });
const Nav = dynamic(() => import("./Nav"), { ssr: false });

export default function Page() {
  const draggingRef = useRef<HTMLImageElement | null>(null);
  const [touchPosition, setTouchPosition] = useAtom(touchPositionAtom);
  const [draggedFish, setDraggedFish] = useAtom(draggedFishAtom);
  const [dropZone, setDropZone] = useAtom(dropZoneAtom);
  const [markersData, setMarkersData] = useAtom(markersDataAtom);

  // Make the fish image follow the touch position
  useEffect(() => {
    if (!draggingRef.current) return;
    draggingRef.current.style.left = `${touchPosition[0]}px`;
    draggingRef.current.style.top = `${touchPosition[1]}px`;
  }, [draggingRef, touchPosition]);

  return (
    <>
      <div
        className="h-full w-full"
        onTouchMove={(e) => {
          setTouchPosition([e.touches[0].clientX, e.touches[0].clientY - 20]);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          if (dropZone && draggedFish) {
            // Add the dropped fish to the markersData
            const olds = markersData.filter((m) => m.id !== draggedFish?.id);
            setMarkersData([
              ...olds,
              {
                id: draggedFish!.id,
                polygon: dropZone.polygon,
                zone: dropZone.zone,
              },
            ]);
          }
          setDraggedFish(null);
          setDropZone({ polygon: null, zone: "" });
          setTouchPosition([0, 0]);
        }}
      >
        <Map />
        <MarkersView />

        {draggedFish && (
          <Image
            src={`/api/files/${draggedFish.preview.path}`}
            alt={draggedFish.name}
            width={100}
            height={100}
            className="pointer-events-none absolute z-[1000] -translate-x-1/2 -translate-y-full"
            ref={draggingRef}
          />
        )}
      </div>
      <Nav
        onBan={() => {
          setMarkersData([]);
        }}
      />
    </>
  );
}
