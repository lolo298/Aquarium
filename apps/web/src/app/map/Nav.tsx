import { Home, Check, Ban } from "lucide-react";
import { Button } from "@/ui/components/button";
import { useAtom } from "jotai";
import { fishAtom } from "@/lib/atoms";
import { set } from "react-hook-form";
import { use, useEffect } from "react";
import { createPortal } from "react-dom";
import { Polygon } from "leaflet";
import { useQuery } from "@tanstack/react-query";
import { Markers } from "@/types";

export default function Nav({
  markersData,
  onBan,
}: {
  markersData: {
    id: string;
    zone: Polygon<any> | null;
  }[];
  onBan: () => void;
}) {
  const query = useQuery<Markers>({
    queryKey: ["markers"],
    queryFn: async () => await fetch("/api/markers").then((res) => res.json()),
  });

  const allFishsSets =
    query.data?.length === markersData.length &&
    markersData.every((m) => m.zone !== null);
  const oneFishSet =
    markersData.length > 0 && markersData.some((m) => m.zone !== null);

  return createPortal(
    <nav className="flex flex-1 justify-center gap-16  bg-primary-foreground p-8">
      <Button
        variant={allFishsSets ? "default" : "disabled"}
        disabled={!allFishsSets}
      >
        <Check />
      </Button>
      <Button>
        <Home />
      </Button>
      <Button
        variant={oneFishSet ? "default" : "disabled"}
        disabled={!oneFishSet}
        onClick={onBan}
      >
        <Ban />
      </Button>
    </nav>,
    document.body,
  );
}
