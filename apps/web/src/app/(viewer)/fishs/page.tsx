"use client";
import { Markers } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Info, { Data } from "../Info";
import { useRef } from "react";
import Image from "next/image";
import { useLocalStorage } from "usehooks-ts";

export default function Fishs() {
  const [viewedFishs] = useLocalStorage<string[]>("viewedFishs", []);
  const query = useQuery<Markers>({
    queryKey: ["markers"],
    queryFn: async () => await fetch("/api/markers").then((res) => res.json()),
  });

  return (
    <div className="grid h-full grid-cols-2 grid-rows-[repeat(auto-fill,minmax(100px,1fr))] gap-4 overflow-scroll bg-primary p-4">
      {query.data?.map((fish) => {
        if (viewedFishs.includes(fish.id)) {
          return (
            <Info key={fish.id} fishId={fish.id}>
              <div className="relative rounded-lg bg-secondary">
                <Image
                  src={`/api/files/${fish.preview.path}`}
                  alt={fish.name}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </Info>
          );
        } else {
          return (
            <div className="relative rounded-lg bg-secondary" key={fish.id}>
              <Image
                src={`/api/files/${fish.preview.path}`}
                alt={fish.name}
                fill
                className="object-contain brightness-0"
              />
            </div>
          );
        }
      })}
    </div>
  );
}
