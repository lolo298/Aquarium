"use client";
import { serverUrl } from "@/lib";
import { Plane, Sphere, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, ObjectMap } from "@react-three/fiber";
import type { getAllMarkers } from "@repo/db";
import { useQuery } from "@tanstack/react-query";
import { useDrag } from "@use-gesture/react";
import { useState, useRef, useEffect } from "react";
import { ARView, ARAnchor } from "react-three-mind";
import type { GLTF } from "three-stdlib";

type Marker = Awaited<ReturnType<typeof getAllMarkers>>[0];

export default function Viewer() {
  const query = useQuery<Marker[]>({
    queryKey: ["markers"],
    queryFn: async () =>
      await fetch(`${serverUrl}api/markers`).then((res) => res.json()),
  });

  return (
    <ARView
      imageTargets="https://ofnectvdmnyxxznhaagk.supabase.co/storage/v1/object/public/uploadsDev/uploads/targets.mind"
      filterMinCF={1}
      filterBeta={10000}
      missTolerance={0}
      warmupTolerance={0}
      flipUserCamera={false}
      className="inset-0 [&>*:first-child]:absolute [&>*:first-child]:inset-0 [&>*:first-child]:z-10 "
    >
      <ambientLight />
      {query.data?.map((marker, i) => (
        <ARAnchor target={i}>
          <Model marker={marker} key={marker.id} />
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
  const { scene, animations } = useGLTF(marker.model.path) as GLTF & ObjectMap;
  const { actions } = useAnimations(animations, group);

  const bind = useDrag((state) => {
    const diffX = state.velocity[0] * state.direction[0];
    const X = clamp(diffX, -90, 90);
    setRotation((prev) => [prev[0], prev[1] + X, prev[2]]);
  });

  useEffect(() => {
    console.log("Playing animation");
    const anim = actions?.ArmatureAction!;
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
      scale={1}
    />
  );
  // return <Sphere args={[1, 32, 32]} />;
}
