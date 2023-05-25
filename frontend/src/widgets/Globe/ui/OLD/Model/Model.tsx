import { useLoader } from "@react-three/fiber";
import { forwardRef, useState } from "react";
import { Box3, Vector3 } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface ModelProps {
  url: string;
  dontCenter?: boolean;
  scale?: [number, number, number];
}

export const Model = forwardRef(({ url, dontCenter, scale }: ModelProps, ref) => {
  const gltf = useLoader(GLTFLoader, url);

  const [isCentered, setIsCentered] = useState(false);

  const object = gltf.scene;

  if (!isCentered && !dontCenter) {
    // scaling to radius 1
    const box = new Box3().setFromObject(object);
    const size = new Vector3();
    box.getSize(size);
    const maxComponent = Math.max(size.x, size.y, size.z);
    const scale = 1 / (maxComponent / 2);
    object.scale.set(scale, scale, scale);

    // TOKYO
    // object.rotation.y += 0.66;
    // object.rotation.x += 0.28;

    // LONDON
    // object.rotation.y += 0.16;
    // object.rotation.x -= 0.26;

    // centering
    const boxSmall = new Box3().setFromObject(object);
    const center = boxSmall.getCenter(new Vector3());
    object.position.x += (object.position.x - center.x);
    object.position.y += (object.position.y - center.y);
    object.position.z += (object.position.z - center.z);
    setIsCentered(true);
  }

  return (
    <primitive object={object} ref={ref} scale={scale} />
  );
});