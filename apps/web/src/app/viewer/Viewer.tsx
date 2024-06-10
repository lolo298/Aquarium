"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import type {
  ZapparCamera as TCamera,
  ImageTracker as TTracker,
  ZapparCanvas as TCanvas,
} from "@zappar/zappar-react-three-fiber";
import { Html, useAnimations, useGLTF, useProgress } from "@react-three/drei";
import { Stats, OrbitControls } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";
import { useQuery } from "@tanstack/react-query";
import type { getAllMarkers } from "@repo/db";
import type { ObjectMap } from "@react-three/fiber";
import type { GLTF } from "three-stdlib";
import { serverUrl } from "@/lib";
let ZapparCamera: typeof TCamera;
let ImageTracker: typeof TTracker;
let ZapparCanvas: typeof TCanvas;

type Marker = Awaited<ReturnType<typeof getAllMarkers>>[0];

export default function Viewer() {
  const [imported, setImported] = useState(false);

  ////////////////////////
  //      Markers       //
  ////////////////////////
  const query = useQuery<Marker[]>({
    queryKey: ["markers"],
    queryFn: async () =>
      await fetch(`${serverUrl}api/markers`).then((res) => res.json()),
  });

  useEffect(() => {
    (async () => {
      console.log("Loading Zappar components...");
      const {
        ZapparCamera: Camera,
        ImageTracker: Tracker,
        ZapparCanvas: Canvas,
      } = await import("@zappar/zappar-react-three-fiber");
      ZapparCamera = Camera;
      ImageTracker = Tracker;
      ZapparCanvas = Canvas;
      setImported(true);
    })();
  }, []);

  if (!imported) return <h1>Loading...</h1>;

  return (
    <>
      <ZapparCanvas>
        <OrbitControls />
        <ZapparCamera matrixWorldAutoUpdate={undefined} />

        {query.data?.map((marker) => (
          <Tracker key={marker.id} marker={marker} />
        ))}

        <ambientLight intensity={1} />
      </ZapparCanvas>
    </>
  );
}

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

// function Model({ src, text, show }: { src: string; text: string; show: boolean }) {
//   const model = useLoader(GLTFLoader, src);
//   const texture = useTexture(text);

//   if (!show) return null;

//   // Assign the texture to the material of the model
//   // model.scene.traverse((child) => {
//   //   if (child instanceof Mesh) {
//   //     child.material.map = texture;
//   //   }
//   // });

//   return (
//     <mesh>
//       <primitive
//         object={model}
//         scale={[1, 1, 1]}
//         position={[0, 0, -5]}
//         rotation={[0, 90, 0]}
//       ></primitive>
//       <meshStandardMaterial map={texture} />
//     </mesh>
//   );
// }
const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

function Tracker({ marker }: { marker: Marker }) {
  const [visible, setVisible] = useState(false);
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
    if (!visible) return;
    console.log("Playing animation");
    const anim = actions?.ArmatureAction!;
    anim.play();
    return () => {
      anim.stop();
    };
  }, [actions, visible]);

  return (
    <ImageTracker
      onNotVisible={(anchor) => {
        setRotation([0, -90, 0]);
        setVisible(false);
      }}
      onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
      onVisible={(anchor) => setVisible(true)}
      targetImage={marker.marker.path}
      matrixWorldAutoUpdate={undefined}
    >
      <Suspense fallback={<Loader />}>
        {visible && (
          <primitive
            ref={group}
            {...bind()}
            object={scene}
            rotation={rotation}
            scale={1}
          />
        )}
      </Suspense>
    </ImageTracker>
  );
}
