"use client";
import { Scan, Fish, Info, Ruler } from "lucide-react";
import { Link, Button } from "@/ui/components/button";
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
import InfosView from "./Info";
import type { Data } from "./Info";

export default function Nav() {
  const [viewedFishId] = useAtom(viewedFishIdAtom);

  return createPortal(
    <nav className="z-10 flex flex-1 justify-center  gap-16 bg-primary-foreground p-8">
      <Link variant="ghost" href="/fishs">
        <Fish />
      </Link>
      <Link href="/viewer">
        <Scan />
      </Link>
      <InfosView fishId={viewedFishId}>
        <Button disabled={!viewedFishId} variant="secondary">
          <Info />
        </Button>
      </InfosView>
    </nav>,
    document.body,
  );
}
