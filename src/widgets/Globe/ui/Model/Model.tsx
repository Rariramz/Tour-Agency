import { useLoader } from "@react-three/fiber";
import { forwardRef, useState } from "react";
import { Box3, TextureLoader, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const Model = forwardRef(({ url }: { url: string}, ref) => {
  const gltf = useLoader(GLTFLoader, url);
  const [isCentered, setIsCentered] = useState(false);

  // const texture = useLoader(TextureLoader, "/textures/world_map.jpg");
  // const material = new MeshStandardMaterial({ map: texture });
  // globe.material = material;

  const object = gltf.scene;

  if (!isCentered) {
    const box = new Box3().setFromObject(object);
    const center = box.getCenter(new Vector3());
    object.position.x += (object.position.x - center.x);
    object.position.y += (object.position.y - center.y);
    object.position.z += (object.position.z - center.z);
    setIsCentered(true);
  }

  return (
    <primitive object={object} ref={ref} />
  );
});