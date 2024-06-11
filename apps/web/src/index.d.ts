
declare module "react-three-mind" {
  import { Canvas } from "@react-three/fiber";
  import { GroupProps } from "@react-three/fiber";

  type ARViewProps = {
    children: React.ReactNode,
    autoplay?: boolean,
    imageTargets: string,
    maxTrack?: number,
    filterMinCF?: number,
    filterBeta?: number,
    warmupTolerance?: number,
    missTolerance?: number,
    flipUserCamera?: boolean,
    onReady?: () => void,
    onError?: (error: Error) => void,
  } & React.ComponentProps<typeof Canvas>;

  export const ARView: React.FC<ARViewProps>;

  type ARAnchorProps = {
    children: React.ReactNode,
    target: number,
    onAnchorFound?: (anchor: Group) => void,
    onAnchorLost?: (anchor: Group) => void
  } & GroupProps;

  export const ARAnchor: React.FC<ARAnchorProps>;
}
