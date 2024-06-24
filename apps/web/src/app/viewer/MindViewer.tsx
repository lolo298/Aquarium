"use client";
import { Markers } from "@/types";
import { useAnimations, useGLTF } from "@react-three/drei";
import { ObjectMap } from "@react-three/fiber";
import { bucket } from "@repo/db/env";
import { useQuery } from "@tanstack/react-query";
import { useDrag } from "@use-gesture/react";
import { use, useEffect, useRef, useState } from "react";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { ARView, ARAnchor } from "react-three-mind";
import { useAtom } from "jotai";
import { viewedFishIdAtom } from "@/lib/atoms";

type Marker = Markers[0];

export default function Viewer() {
  const [_, setViewedFishId] = useAtom(viewedFishIdAtom);
  const delay = useRef<ReturnType<typeof setTimeout>>();

  // get the markers data
  const query = useQuery<Marker[]>({
    queryKey: ["markers"],
    queryFn: async () => await fetch("/api/markers").then((res) => res.json()),
  });

  return (
    // Instantiate the ARView component with the target compiled from the bucket
    <ARView
      imageTargets="/api/files/uploads/targets.mind"
      filterMinCF={1}
      filterBeta={10000}
      missTolerance={0}
      warmupTolerance={0}
      flipUserCamera={false}
      className="inset-0 z-0 !min-h-0 [&>*:first-child]:absolute [&>*:first-child]:inset-0 [&>*:first-child]:z-10"
    >
      <ambientLight />
      {/* Create an anchor for every markers in db */}
      {query.data?.map((marker, i) => (
        <ARAnchor
          target={i}
          key={marker.id}
          onAnchorFound={() => {
            clearTimeout(delay.current);
            setViewedFishId(marker.id);
            console.log("Found anchor", marker);
          }}
          onAnchorLost={() => {
            delay.current = setTimeout(() => {
              setViewedFishId(null);
            }, 2000);
          }}
        >
          <Model marker={marker} />
        </ARAnchor>
      ))}
    </ARView>
  );
}

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

function Model({ marker }: { marker: Marker }) {
  const [rotation, setRotation] = useState<[number, number, number]>([
    0, -90, 0,
  ]);
  const group = useRef<THREE.Group>();
  const { scene, animations } = useGLTF(
    `/api/files/${marker.model.path}`,
  ) as GLTF & ObjectMap;
  const { actions } = useAnimations(animations, group);

  // Allow rotation of the model on touch
  const bind = useDrag((state) => {
    const diffX = state.velocity[0] * state.direction[0];
    const X = clamp(diffX, -90, 90);
    setRotation((prev) => [prev[0], prev[1] + X, prev[2]]);
  });

  useEffect(() => {
    console.log("Playing animation");
    const anim = actions?.ArmatureAction;
    if (!anim) return;
    anim.play();
    return () => {
      anim.stop();
    };
  }, [actions]);

  return (
    <primitive
      ref={group}
      {...bind()}
      object={scene}
      rotation={rotation}
      scale={0.75}
    />
  );
}
