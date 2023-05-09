import { useLoader } from "@react-three/fiber";
import { forwardRef, useState } from "react";
import { Box3, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const Model = forwardRef(({ url }: { url: string}, ref) => {
  const gltf = useLoader(GLTFLoader, url);

  const [isCentered, setIsCentered] = useState(false);

  const object = gltf.scene;

  if (!isCentered) {
    // scaling to radius 1
    const box = new Box3().setFromObject(object);
    const size = new Vector3();
    box.getSize(size);
    const maxComponent = Math.max(size.x, size.y, size.z);
    const scale = 1 / (maxComponent / 2);
    object.scale.set(scale, scale, scale);
    // centering
    const boxSmall = new Box3().setFromObject(object);
    const center = boxSmall.getCenter(new Vector3());
    object.position.x += (object.position.x - center.x);
    object.position.y += (object.position.y - center.y);
    object.position.z += (object.position.z - center.z);
    setIsCentered(true);
  }

  return (
    <primitive object={object} ref={ref} />
  );
});