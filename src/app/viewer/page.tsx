"use client";

import { Suspense, useEffect, useState } from "react";
import type {
  ZapparCamera as TCamera,
  ImageTracker as TTracker,
  ZapparCanvas as TCanvas,
} from "@zappar/zappar-react-three-fiber";
import { Canvas, Euler, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Html, useProgress, useTexture } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AmbientLight, Mesh } from "three";
import { Model } from "@/components/Dorade";
import { Stats, OrbitControls } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";
let ZapparCamera: typeof TCamera;
let ImageTracker: typeof TTracker;
let ZapparCanvas: typeof TCanvas;

export default function Viewer() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [imported, setImported] = useState(false);
  const [rotation, setRotation] = useState<[number, number, number]>([0, -90, 0]);
  const [initialPos, setInitialPos] = useState(0);
  const bind = useDrag((state) => {
    const diff = state.velocity[0] * state.direction[0];
    const rotation = clamp(diff, -90, 90);
    console.log(initialPos, diff, rotation);
    setRotation((prev) => [prev[0], prev[1] + rotation, prev[2]]);
  });

  ////////////////////////
  //      Markers       //
  ////////////////////////
  const targetFile = "/assets/example-tracking-image.zpt";
  const targetSecond = "/assets/ar-marker-test.zpt";

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
  const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

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
      {/* <Canvas>
        <OrbitControls />
        <Stats />
        <camera position={[0, 0, 5]} />
        <Model />

        <ambientLight intensity={1} />
      </Canvas> */}
      <ZapparCanvas {...bind()} draggable>
        <OrbitControls />
        <Stats />
        <ZapparCamera />
        <ImageTracker
          onNotVisible={(anchor) => {
            setRotation([0, -90, 0]);
            setVisible(false);
          }}
          onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
          onVisible={(anchor) => setVisible(true)}
          targetImage={targetSecond}
        >
          <Suspense fallback={<Loader />}>
            <Model visible={visible} scale={1} rotation={rotation} />
          </Suspense>
        </ImageTracker>
        <ImageTracker
          onNotVisible={(anchor) => {
            setRotation([0, -90, 0]);
            setVisible2(false);
          }}
          onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
          onVisible={(anchor) => setVisible2(true)}
          targetImage={targetFile}
        >
          <Suspense fallback={<Loader />}>
            <Model visible={visible2} scale={1} rotation={rotation} />
          </Suspense>
        </ImageTracker>
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
