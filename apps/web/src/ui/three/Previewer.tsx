import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Previewer({ modelSrc }: { modelSrc: string }) {
  const model = useGLTF(modelSrc);
  return (
    <Canvas>
      <ambientLight />
      <camera position={[0, 0, 10]} />
      <primitive object={model.scene} rotation={[0, -8, 0]} scale={2.5} />
      <OrbitControls />
    </Canvas>
  );
}

export default Previewer;
