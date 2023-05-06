import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const Model = ({ url }: { url: string}) => {
    const gltf = useLoader(GLTFLoader, url);
    return (
      <primitive object={gltf.scene} scale={0.4} />
    );
};