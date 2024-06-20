import { Marker, Polygon, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng, type LatLngExpression } from "leaflet";
import { RefAttributes, useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import {
  draggedFishAtom,
  dropZoneAtom,
  markersDataAtom,
  touchPositionAtom,
  zonesConfigAtom,
} from "@/lib/atoms";
import { set } from "react-hook-form";

export default function DropZone() {
  const [options, setOptions] = useAtom(zonesConfigAtom);
  const [touchPosition, setTouchPosition] = useAtom(touchPositionAtom);
  const [draggedFish, setDraggedFish] = useAtom(draggedFishAtom);
  const [dropZone, setDropZone] = useAtom(dropZoneAtom);

  const embrunsRef = useRef<L.Polygon | null>(null);
  const nurseRef = useRef<L.Polygon | null>(null);
  const brumeRef = useRef<L.Polygon | null>(null);
  const deepRef = useRef<L.Polygon | null>(null);

  const embrunsBounds: LatLngExpression[] = [
    [80, 130],
    [180, 140],
    [200, 180],
    [180, 220],
    [80, 230],
    [60, 180],
  ];

  const nurseBounds: LatLngExpression[] = [
    [80, 350],
    [120, 380],
    [110, 420],
    [50, 430],
    [40, 400],
    [45, 360],
  ];

  const brumeBounds: LatLngExpression[] = [
    [120, 260],
    [220, 265],
    [215, 370],
    [140, 360],
    [110, 310],
  ];

  const deepBounds: LatLngExpression[] = [
    [370, 330],
    [280, 350],
    [230, 300],
    [250, 220],
    [280, 260],
  ];
  const map = useMap();

  useEffect(() => {
    const coordinates = map.containerPointToLatLng(touchPosition);
    if (!draggedFish) {
      setOptions({
        ...options,
        embruns: { options: { color: "purple" } },
        nurse: { options: { color: "purple" } },
        brume: { options: { color: "purple" } },
        deep: { options: { color: "purple" } },
      });
      setDropZone(null);
      return;
    }
    switch (true) {
      case embrunsRef.current?.getBounds().contains(coordinates):
        setOptions({
          ...options,
          embruns: { options: { color: "yellow" } },
        });
        setDropZone(embrunsRef.current);
        break;
      case nurseRef.current?.getBounds().contains(coordinates):
        setOptions({
          ...options,
          nurse: { options: { color: "yellow" } },
        });
        setDropZone(nurseRef.current);
        break;
      case brumeRef.current?.getBounds().contains(coordinates):
        setOptions({
          ...options,
          brume: { options: { color: "yellow" } },
        });

        setDropZone(brumeRef.current);
        break;
      case deepRef.current?.getBounds().contains(coordinates):
        setOptions({
          ...options,
          deep: { options: { color: "yellow" } },
        });
        setDropZone(deepRef.current);
        break;
      default:
        setOptions({
          ...options,
          embruns: { options: { color: "purple" } },
          nurse: { options: { color: "purple" } },
          brume: { options: { color: "purple" } },
          deep: { options: { color: "purple" } },
        });
        setDropZone(null);
        break;
    }
  }, [touchPosition]);

  return (
    <>
      <Polygon
        pathOptions={options.embruns.options}
        positions={embrunsBounds}
        ref={embrunsRef}
      ></Polygon>
      <Polygon
        pathOptions={options.nurse.options}
        positions={nurseBounds}
        ref={nurseRef}
      ></Polygon>
      <Polygon
        pathOptions={options.brume.options}
        positions={brumeBounds}
        ref={brumeRef}
      ></Polygon>
      <Polygon
        pathOptions={options.deep.options}
        positions={deepBounds}
        ref={deepRef}
      ></Polygon>
    </>
  );
}
