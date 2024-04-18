"use client";

import { Suspense, useEffect, useState } from "react";
import type {
  ZapparCamera as TCamera,
  ImageTracker as TTracker,
  ZapparCanvas as TCanvas,
} from "@zappar/zappar-react-three-fiber";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Html, useProgress, useTexture } from "@react-three/drei";
let ZapparCamera: typeof TCamera;
let ImageTracker: typeof TTracker;
let ZapparCanvas: typeof TCanvas;

export default function Viewer() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [imported, setImported] = useState(false);
  ////////////////////////
  //      Markers       //
  ////////////////////////
  const targetFile = "/assets/example-tracking-image.zpt";
  const targetSecond = "/assets/ar-marker-test.zpt";

  ////////////////////////
  //       Models       //
  ////////////////////////
  const dorade = "/assets/dorade.fbx";
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

  return (
    <>
      <h1>Viewer</h1>
      <ZapparCanvas>
        <ZapparCamera />
        <ImageTracker
          onNotVisible={(anchor) => setVisible(false)}
          onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
          onVisible={(anchor) => setVisible(true)}
          targetImage={targetSecond}
        >
          <Suspense fallback={<Loader />}>
            <Model show={visible} src={dorade} text={doradeTexture} />
          </Suspense>
        </ImageTracker>
        <ImageTracker
          onNotVisible={(anchor) => setVisible2(false)}
          onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
          onVisible={(anchor) => setVisible2(true)}
          targetImage={targetFile}
        >
          <Suspense fallback={<Loader />}>
            <Model show={visible2} src={dorade} text={doradeTexture} />
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

function Model({ src, text, show }: { src: string; text: string; show: boolean }) {
  const model = useLoader(FBXLoader, src);
  const texture = useTexture(text);

  if (!show) return null;

  // Assign the texture to the material of the model
  model.traverse((child) => {
    // @ts-ignore
    if (child.isMesh) {
      // @ts-ignore
      child.material.map = texture;
    }
  });

  return (
    <mesh>
      <primitive
        object={model}
        scale={[0.01, 0.01, 0.01]}
        position={[0, 0, -5]}
        rotation={[0, 90, 0]}
      ></primitive>
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
