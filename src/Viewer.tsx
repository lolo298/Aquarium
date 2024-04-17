import { Suspense, useState } from "react";
import { ZapparCamera, ImageTracker, ZapparCanvas } from "@zappar/zappar-react-three-fiber";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Html, useProgress, useTexture } from "@react-three/drei";

////////////////////////
//      Markers       //
////////////////////////
const targetFile = new URL("./assets/example-tracking-image.zpt", import.meta.url).href;
const targetSecond = new URL("./assets/marker.zpt", import.meta.url).href;

////////////////////////
//       Models       //
////////////////////////
const dorade = new URL("./assets/dorade.fbx", import.meta.url).href;
const doradeTexture = new URL("./assets/refTexture.png", import.meta.url).href;

export default function Viewer() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  return (
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
