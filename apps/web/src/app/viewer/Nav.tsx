import { Scan, Fish, Info, Ruler } from "lucide-react";
import { Button } from "@/ui/components/button";
import { createPortal } from "react-dom";
import { Polygon } from "leaflet";
import { useQuery } from "@tanstack/react-query";
import type { Fish as FishType, Markers } from "@/types";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/ui/components/drawer";
import { useAtom } from "jotai";
import { viewedFishIdAtom } from "@/lib/atoms";
import { useRef } from "react";
import Image from "next/image";

type Data = {
  primaryName: FishType["names"][0];
  altsNames: FishType["names"];
  latin: FishType["names"][0];
  others: FishType["names"];
} & Omit<FishType, "names">;

export default function Nav() {
  const data = useRef<Partial<Data>>({});
  const [viewedFishId] = useAtom(viewedFishIdAtom);
  // const viewedFishId = "2f8833eb-285c-46df-aa52-6f72c09ccf64";
  const query = useQuery<FishType>({
    queryKey: ["fish", viewedFishId],
    enabled: !!viewedFishId,
    queryFn: async () =>
      await fetch(`/api/fish/${viewedFishId}`).then((res) => res.json()),
  });

  const fishData = query.data;

  console.log("found fish data: ", viewedFishId, fishData);

  if (fishData) {
    data.current.primaryName = fishData.names.find((n) => n.primary)!;
    data.current.altsNames = fishData.names.filter(
      (n) => !n.primary && n.language === "FR",
    );
    data.current.latin = fishData.names.find((n) => n.language === "LAT")!;
    data.current.others = fishData.names.filter(
      (n) => n.language !== "FR" && n.language !== "LAT" && !n.primary,
    );

    const { names, ...rest } = fishData;
    data.current = { ...data.current, ...rest };
  }

  return createPortal(
    <nav className="z-10 flex flex-1 justify-center  gap-16 bg-primary-foreground p-8">
      <Button variant="ghost">
        <Fish />
      </Button>
      <Button>
        <Scan />
      </Button>
      <Drawer>
        <DrawerTrigger asChild>
          <Button disabled={!viewedFishId}>
            <Info />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-2/3">
          <div className="flex h-full flex-col items-center gap-4 p-4 text-left">
            <DrawerHeader>
              <DrawerTitle className="text-xl text-primary-foreground">
                {data.current.primaryName?.name}
              </DrawerTitle>
            </DrawerHeader>
            <DrawerDescription>{data.current.description}</DrawerDescription>
            <div className="flex flex-col ">
              <div className="flex gap-2">
                <div className="flex w-full flex-col">
                  <div>
                    <h3 className="text-lg font-bold text-primary-foreground">
                      Noms courants
                    </h3>
                    <ul className="text-sm">
                      {data.current.altsNames?.map((n) => (
                        <li key={n.id}>{n.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary-foreground">
                      Nom latin
                    </h3>
                    <p className="text-sm">{data.current.latin?.name}</p>
                  </div>
                </div>
                <div className="flex w-full flex-col">
                  <div>
                    <h3 className="text-lg font-bold text-primary-foreground">
                      Autres noms
                    </h3>
                    <ul className="text-sm">
                      {data.current.others?.map((n) => (
                        <li key={n.id}>
                          <span className="font-bold">{n.language} : </span>
                          {n.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mx-auto w-2/3">
                <span className="flex items-center gap-2">
                  <Ruler size={48} />
                  {data.current.long} cm de longeur
                </span>
                <span className="flex items-center gap-2">
                  <Image
                    src="/images/FishFood.png"
                    alt="food: "
                    height={48}
                    width={48}
                  />
                  {data.current.food?.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </nav>,
    document.body,
  );
}
