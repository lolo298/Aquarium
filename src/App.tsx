import React, { Suspense, useMemo } from "react";
import { ZapparCamera, ImageTracker, ZapparCanvas } from "@zappar/zappar-react-three-fiber";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Html, useFBX, useProgress, useTexture } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}
const targetFile = new URL("./assets/example-tracking-image.zpt", import.meta.url).href;
const dorade = new URL("./assets/dorade.fbx", import.meta.url).href;
const doradeTexture = new URL("./assets/refTexture.png", import.meta.url).href;

function Model() {
  const model = useLoader(FBXLoader, dorade);
  const texture = useTexture(doradeTexture);
  const geometry = useMemo(() => {
    let g;
    model.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c as Mesh;
        g = _c.geometry;
      }
    });
    return g;
  }, [model]);

  return (
    <mesh geometry={geometry} scale={[0.1, 0.1, 0.1]} position={[0, 0, -5]} rotation={[0, 90, 0]}>
      <meshPhysicalMaterial map={texture} />
    </mesh>
  );
}

function App() {
  return (
    <ZapparCanvas>
      <ZapparCamera />
      <ImageTracker
        onNotVisible={(anchor) => console.log(`Not visible ${anchor.id}`)}
        onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
        onVisible={(anchor) => console.log(`Visible ${anchor.id}`)}
        targetImage={targetFile}
      >
        <Suspense fallback={<Loader />}>
          <Model />
        </Suspense>
      </ImageTracker>
      <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
    </ZapparCanvas>
  );
}

export default App;
