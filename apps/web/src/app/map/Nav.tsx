import { Home, Check, Ban } from "lucide-react";
import { Button } from "@/ui/components/button";
import { createPortal } from "react-dom";
import { Polygon } from "leaflet";
import { useQuery } from "@tanstack/react-query";
import { Fishs } from "@/types";
import { markersDataAtom } from "@/lib/atoms";
import { useAtom } from "jotai/react";
import { toast } from "sonner";
import { set } from "react-hook-form";

export default function Nav({ onBan }: { onBan: () => void }) {
  const [markersData, setMarkersData] = useAtom(markersDataAtom);

  const query = useQuery<Fishs>({
    queryKey: ["fishs"],
    queryFn: async () => await fetch("/api/fish").then((res) => res.json()),
  });

  const allFishsSets =
    query.data?.length === markersData.length &&
    markersData.every((m) => m.zone !== null);
  const oneFishSet =
    markersData.length > 0 && markersData.some((m) => m.zone !== null);

  return createPortal(
    <nav className="flex flex-1 justify-center gap-16  bg-primary-foreground p-8">
      <Button
        disabled={!allFishsSets}
        onClick={() => {
          const goods = markersData.filter(
            (m) =>
              m.zone === query.data?.find((f) => f.MarkerId === m.id)?.zone,
          );

          setMarkersData(goods);

          if (goods.length === markersData.length) {
            toast.success("Bien joué !");
          } else {
            toast.error("Certains poissons ne sont pas à la bonne place");
          }
        }}
      >
        <Check />
      </Button>
      <Button disabled={!oneFishSet} onClick={onBan}>
        <Ban />
      </Button>
    </nav>,
    document.body,
  );
}
