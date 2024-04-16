import { Suspense, useState } from "react";
import { ZapparCamera, ImageTracker, ZapparCanvas } from "@zappar/zappar-react-three-fiber";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Html, useProgress, useTexture } from "@react-three/drei";
export default function Viewer() {
  const [visible, setVisible] = useState(false);

  return (
    <ZapparCanvas>
      <ZapparCamera />
      <ImageTracker
        onNotVisible={(anchor) => setVisible(false)}
        onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
        onVisible={(anchor) => setVisible(true)}
        targetImage={targetFile}
      >
        <Suspense fallback={<Loader />}>
          <Model show={visible} />
        </Suspense>
      </ImageTracker>
      <ambientLight intensity={1} />
    </ZapparCanvas>
  );
}

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}
const targetFile = new URL("./assets/example-tracking-image.zpt", import.meta.url).href;
const dorade = new URL("./assets/dorade.fbx", import.meta.url).href;
const doradeTexture = new URL("./assets/refTexture.png", import.meta.url).href;

function Model({ show }: { show: boolean }) {
  const model = useLoader(FBXLoader, dorade);
  const texture = useTexture(doradeTexture);

  if (!show) return null;

  // Assign the texture to the material of the model
  model.traverse((child) => {
    console.log(child);
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
