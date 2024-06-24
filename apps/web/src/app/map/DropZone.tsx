import { Polygon, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { type LatLngExpression } from "leaflet";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import {
  draggedFishAtom,
  dropZoneAtom,
  touchPositionAtom,
  zonesConfigAtom,
} from "@/lib/atoms";

export default function DropZone() {
  const [options, setOptions] = useAtom(zonesConfigAtom);
  const [touchPosition, setTouchPosition] = useAtom(touchPositionAtom);
  const [draggedFish, setDraggedFish] = useAtom(draggedFishAtom);
  const [dropZone, setDropZone] = useAtom(dropZoneAtom);

  // Refs to the differnets leaflet layers
  const embrunsRef = useRef<L.Polygon | null>(null);
  const nurseRef = useRef<L.Polygon | null>(null);
  const brumeRef = useRef<L.Polygon | null>(null);
  const deepRef = useRef<L.Polygon | null>(null);

  // The bounds of the differents zones on the map
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
    // Remove the styles when the fish is not dragged
    if (!draggedFish) {
      setOptions({
        ...options,
        embruns: { options: { color: "purple" } },
        nurse: { options: { color: "purple" } },
        brume: { options: { color: "purple" } },
        deep: { options: { color: "purple" } },
      });
      setDropZone({ polygon: null, zone: "" });
      return;
    }

    // Convert the touch coordinates on the document to map coordinates
    const coordinates = map.containerPointToLatLng(touchPosition);

    // Check if the fish is in a drop zone and change the style of the zone
    switch (true) {
      case embrunsRef.current?.getBounds().contains(coordinates):
        setOptions({
          ...options,
          embruns: { options: { color: "yellow" } },
        });
        setDropZone({ polygon: embrunsRef.current, zone: "embruns" });
        break;
      case nurseRef.current?.getBounds().contains(coordinates):
        setOptions({
          ...options,
          nurse: { options: { color: "yellow" } },
        });
        setDropZone({ polygon: nurseRef.current, zone: "nurse" });
        break;
      case brumeRef.current?.getBounds().contains(coordinates):
        setOptions({
          ...options,
          brume: { options: { color: "yellow" } },
        });

        setDropZone({ polygon: brumeRef.current, zone: "brume" });
        break;
      case deepRef.current?.getBounds().contains(coordinates):
        setOptions({
          ...options,
          deep: { options: { color: "yellow" } },
        });
        setDropZone({ polygon: deepRef.current, zone: "deep" });
        break;
      default:
        setOptions({
          ...options,
          embruns: { options: { color: "purple" } },
          nurse: { options: { color: "purple" } },
          brume: { options: { color: "purple" } },
          deep: { options: { color: "purple" } },
        });
        setDropZone({ polygon: null, zone: "" });
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
