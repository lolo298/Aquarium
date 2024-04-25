"use client";

import { Suspense, useEffect, useState } from "react";
import type {
  ZapparCamera as TCamera,
  ImageTracker as TTracker,
  ZapparCanvas as TCanvas,
} from "@zappar/zappar-react-three-fiber";
import { Html, useGLTF, useProgress } from "@react-three/drei";
// import Model from "@/ui/three/Dorade";
import { Stats, OrbitControls } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";
import { useQuery } from "@tanstack/react-query";
import type { getAllMarkers } from "@repo/db";
import Model from "@/ui/three/Dorade";
let ZapparCamera: typeof TCamera;
let ImageTracker: typeof TTracker;
let ZapparCanvas: typeof TCanvas;

type Marker = Awaited<ReturnType<typeof getAllMarkers>>[0];

export default function Viewer() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [imported, setImported] = useState(false);
  const [rotation, setRotation] = useState<[number, number, number]>([
    0, -90, 0,
  ]);
  const [initialPos, setInitialPos] = useState(0);
  const bind = useDrag((state) => {
    const diffX = state.velocity[0] * state.direction[0];
    const X = clamp(diffX, -90, 90);
    setRotation((prev) => [prev[0], prev[1] + X, prev[2]]);
  });

  ////////////////////////
  //      Markers       //
  ////////////////////////
  const targetFile = "/assets/example-tracking-image.zpt";
  const targetSecond = "/assets/ar-marker-test.zpt";
  const query = useQuery<Marker[]>({
    queryKey: ["markers"],
    queryFn: async () => await fetch("/api/markers").then((res) => res.json()),
  });

  ////////////////////////
  //       Models       //
  ////////////////////////
  // const dorade = "/assets/dorade.glb";
  const doradeTexture = "/assets/refTexture.png";

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
  const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);

  function handleDragStart(e: TouchEvent) {
    const touch = e.touches[0];
    setInitialPos(touch.screenX);
  }

  function handleOrbitControl(e: TouchEvent) {
    console.log(e);
    const touch = e.touches[0];
    const diff = touch.screenX - initialPos;
    const rotation = clamp(diff, -90, 90);
    console.log(initialPos, diff, rotation);
    setRotation([0, rotation, 0]);
  }

  return (
    <>
      <ZapparCanvas {...bind()} draggable>
        <OrbitControls />
        <Stats />
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

function Tracker({ marker }: { marker: Marker }) {
  const [visible, setVisible] = useState(false);
  const model = useGLTF(marker.model.path);

  const rotation = [0, -90, 0];
  return (
    <ImageTracker
      onNotVisible={(anchor) => {
        // setRotation([0, -90, 0]);
        setVisible(false);
      }}
      onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
      onVisible={(anchor) => setVisible(true)}
      targetImage={marker.marker.path}
      matrixWorldAutoUpdate={undefined}
    >
      <Suspense fallback={<Loader />}>
        {visible && (
          <primitive object={model.scene} rotation={rotation} scale={1} />
        )}
      </Suspense>
    </ImageTracker>
  );
}
