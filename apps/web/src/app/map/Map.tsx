import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  WMSTileLayer,
  ImageOverlay,
  Polygon,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type {
  LatLngExpression,
  LatLngBoundsExpression,
  Polygon as LeafletPolygon,
  PointExpression,
} from "leaflet";
import {
  LegacyRef,
  RefAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import DropZone from "./DropZone";
import { useQuery } from "@tanstack/react-query";
import { Markers } from "@/types";
import { markersDataAtom } from "@/lib/atoms";
import { useAtom } from "jotai/react";

export default function Map() {
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

  const fishsByZones = useMemo(
    () =>
      Object.groupBy(
        data.filter((marker) => marker.zone),
        (marker) => marker.zone!.getLatLngs().toString(),
      ),
    [data],
  );

  let markers: React.ReactNode[] = useMemo(() => {
    let res: React.ReactNode[] = [];
    for (const markersFromZone of Object.values(fishsByZones)) {
      if (!markersFromZone || markersFromZone.length === 0) continue;

      let center = markersFromZone[0].zone!.getCenter();

      markersFromZone.forEach((marker, i) => {
        const img = new Image();
        img.src = marker.preview!.path;
        const aspect = img.naturalWidth / img.naturalHeight;
        const size = 25;
        const iconSize: PointExpression = [aspect * size, size];

        const position = new L.LatLng(center.lat + iconSize[1] * i, center.lng);

        res.push(
          <Marker
            position={position}
            key={marker.id}
            icon={
              new L.Icon({
                iconUrl: marker.preview!.path,
                iconSize,
              })
            }
          />,
        );
      });
    }
    return res;
  }, [fishsByZones]);

  const bounds: LatLngBoundsExpression = [
    [0, 0],
    [439, 586],
  ];

  return (
    <MapContainer
      center={[0, 0]}
      scrollWheelZoom={true}
      className="h-full"
      crs={L.CRS.Simple}
      bounds={bounds}
    >
      <ImageOverlay url="/images/map.png" bounds={bounds} />
      <DropZone />

      {markers}
    </MapContainer>
  );
}
