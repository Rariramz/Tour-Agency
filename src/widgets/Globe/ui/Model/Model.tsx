import { useLoader } from "@react-three/fiber";
import { forwardRef } from "react";
import { Box3, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const Model = forwardRef(({ url }: { url: string}, ref) => {
  const gltf = useLoader(GLTFLoader, url);

  const object = gltf.scene;

  //centering
  const box = new Box3().setFromObject(object);
  const center = box.getCenter(new Vector3());
  object.position.x += (object.position.x - center.x);
  object.position.y += (object.position.y - center.y);
  object.position.z += (object.position.z - center.z);

  return (
    <primitive object={object} ref={ref} />
  );
});